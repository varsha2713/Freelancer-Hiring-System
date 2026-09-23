const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch {
    return [];
  }
};

const getUser = (id, fallback) => {
  const users = getStoredUsers();
  return users.find((user) => Number(user.id) === Number(id)) || fallback || {};
};

const valueOrMissing = (value) => value === undefined || value === null || value === '' ? 'Not provided' : String(value);

const pdfEscape = (value) => String(value)
  .replace(/\\/g, '\\\\')
  .replace(/\(/g, '\\(')
  .replace(/\)/g, '\\)')
  .replace(/[^\x20-\x7E]/g, '');

const wrapText = (value, maxLength = 82) => {
  const words = String(value).split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    if ((line + ' ' + word).trim().length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  });
  if (line) lines.push(line);
  return lines.length ? lines : [''];
};

const createPdf = (commands) => {
  const stream = commands.join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: 'application/pdf' });
};

export const downloadContractPdf = ({ contract, project, proposal, currentUser }) => {
  const client = getUser(contract.clientId || project?.clientId, currentUser?.role === 'CLIENT' ? currentUser : null);
  const freelancer = getUser(contract.freelancerId || proposal?.freelancerId, currentUser?.role === 'FREELANCER' ? currentUser : null);
  const clientName = valueOrMissing(client.name || client.fullName || client.companyName || client.username || client.email);
  const freelancerName = valueOrMissing(freelancer.name || freelancer.fullName || freelancer.username || freelancer.email);
  const projectTitle = valueOrMissing(project?.title || contract.projectTitle);
  const domain = valueOrMissing(project?.category || project?.domain || freelancer.domain || freelancer.specialization);
  const amount = contract.amount || contract.agreedAmount || proposal?.bidAmount || 0;
  const lines = [];
  const text = (value, x, y, size = 10, bold = false) => {
    lines.push(`/F1 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfEscape(value)}) Tj`);
  };
  const wrapped = (value, x, y, size = 10) => {
    wrapText(value).forEach((line, index) => text(line, x, y - index * 14, size));
  };
  const rule = (x1, y, x2) => lines.push(`0.75 w ${x1} ${y} m ${x2} ${y} l S`);

  lines.push('0.35 0.22 0.55 rg 0 0 612 792 re f');
  lines.push('1 1 1 rg 36 36 540 720 re f');
  lines.push('0.12 0.09 0.2 rg');
  text('PROLANCE', 72, 730, 26, true);
  text('FREELANCER SERVICES AGREEMENT', 72, 700, 14, true);
  text(`Contract ID: ${valueOrMissing(contract.id)}`, 72, 678, 10);
  text(`Issued: ${valueOrMissing(contract.startDate || new Date().toISOString().split('T')[0])}`, 400, 678, 10);
  rule(72, 660, 540);
  text('PARTIES AND WORKING RELATIONSHIP', 72, 635, 12, true);
  wrapped(`Company / Client: ${clientName} (ID: ${valueOrMissing(contract.clientId || project?.clientId)})`, 72, 612);
  wrapped(`Freelancer / Worker: ${freelancerName} (ID: ${valueOrMissing(contract.freelancerId || proposal?.freelancerId)})`, 72, 588);
  wrapped(`Relationship: ${freelancerName} is working with ${clientName} on behalf of Prolance.`, 72, 564);
  wrapped(`Freelancer age: ${valueOrMissing(freelancer.age)} | Freelancer domain: ${domain}`, 72, 540);
  wrapped(`Company authentication: ${client.email ? `Account email ${client.email}` : 'Account identity recorded'} | Freelancer authentication: ${freelancer.email ? `Account email ${freelancer.email}` : 'Account identity recorded'}`, 72, 516);
  rule(72, 490, 540);
  text('PROJECT AND COMMERCIAL TERMS', 72, 466, 12, true);
  wrapped(`Project: ${projectTitle}`, 72, 443);
  wrapped(`Scope summary: ${valueOrMissing(project?.description)}`, 72, 419);
  text(`Domain / category: ${domain}`, 72, 381, 10);
  text(`Agreed amount: $${valueOrMissing(amount)}`, 72, 359, 10);
  text(`Payment terms: ${valueOrMissing(contract.paymentTerms)}`, 300, 359, 10);
  text(`Deadline: ${valueOrMissing(project?.deadline || contract.deadline)}`, 72, 337, 10);
  text(`Status: ${valueOrMissing(contract.status)} | Payment: ${valueOrMissing(contract.paymentStatus)}`, 300, 337, 10);
  rule(72, 313, 540);
  text('AUTHORIZATION AND SIGNATURE RECORD', 72, 289, 12, true);
  wrapped('This document records the agreement and approvals captured by the Prolance platform. It is not a government-issued identity document or notarized signature.', 72, 266, 9);
  text(`Company approval: ${contract.clientApproval ? 'APPROVED' : 'PENDING'} by ${clientName}`, 72, 220, 10);
  text(`Freelancer approval: ${contract.freelancerApproval ? 'APPROVED' : 'PENDING'} by ${freelancerName}`, 72, 198, 10);
  rule(72, 164, 250);
  rule(330, 164, 508);
  text(`${clientName}`, 72, 145, 9);
  text(`${freelancerName}`, 330, 145, 9);
  text('Company / Client approval', 72, 130, 9);
  text('Freelancer / Worker approval', 330, 130, 9);
  text(contract.clientApproval ? 'Platform signature recorded' : 'Awaiting platform approval', 72, 112, 8);
  text(contract.freelancerApproval ? 'Platform signature recorded' : 'Awaiting platform approval', 330, 112, 8);
  lines.push('0.35 0.22 0.55 RG 484 70 42 42 re S');
  text('PROLANCE', 487, 91, 7, true);
  text('SEALED', 490, 79, 7, true);
  text('Platform contract seal', 72, 70, 8);

  const blob = createPdf(lines);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Prolance_Contract_${contract.id}.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
};