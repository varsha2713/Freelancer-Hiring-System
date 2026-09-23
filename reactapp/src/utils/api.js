// src/utils/api.js

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to initialize local storage
const initStorage = (key, initialData) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(initialData));
  }
  return JSON.parse(localStorage.getItem(key));
};

const mockProjectsData = [];
const mockContractsData = [];
const mockProposalsData = [];

const mockUsersData = [
  { id: 1, email: 'client@test.com', username: 'John Client', role: 'CLIENT', password: 'password' },
  { id: 2, email: 'freelancer@test.com', username: 'Jane Freelancer', role: 'FREELANCER', password: 'password' },
];

const removeLegacyDemoData = () => {
  const demoProjectTitles = ['E-commerce Website', 'Logo Design', 'Mobile App'];
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  const cleanedProjects = projects.filter((project) => (
    ![1, 2, 3].includes(Number(project.id)) || !demoProjectTitles.includes(project.title)
  ));
  if (cleanedProjects.length !== projects.length) {
    localStorage.setItem('projects', JSON.stringify(cleanedProjects));
  }

  const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
  const cleanedContracts = contracts.filter((contract) => Number(contract.id) !== 1 || contract.proposalId);
  if (cleanedContracts.length !== contracts.length) {
    localStorage.setItem('contracts', JSON.stringify(cleanedContracts));
  }

  const proposals = JSON.parse(localStorage.getItem('proposals') || '[]');
  const cleanedProposals = proposals.filter((proposal) => Number(proposal.id) !== 1 || proposal.projectId !== 1);
  if (cleanedProposals.length !== proposals.length) {
    localStorage.setItem('proposals', JSON.stringify(cleanedProposals));
  }
};

removeLegacyDemoData();

export async function fetchProjects() {
  await delay(400);
  return initStorage('projects', mockProjectsData);
}

export async function fetchProjectById(id) {
  await delay(300);
  const projects = initStorage('projects', mockProjectsData);
  return projects.find(p => p.id === parseInt(id));
}

export async function fetchProjectsByUser(userId) {
  await delay(300);
  const projects = initStorage('projects', mockProjectsData);
  return projects.filter(p => p.clientId === parseInt(userId));
}

export async function submitProject(projectData) {
  await delay(500);
  const projects = initStorage('projects', mockProjectsData);
  const newProject = { ...projectData, id: Date.now(), status: 'OPEN' };
  localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
  return newProject;
}

export async function submitProposal(proposal) {
  await delay(500);
  const proposals = initStorage('proposals', mockProposalsData);
  const newProposal = { ...proposal, id: Date.now(), status: 'PENDING' };
  localStorage.setItem('proposals', JSON.stringify([...proposals, newProposal]));
  return newProposal;
}

export async function registerUser(userData) {
  await delay(500);
  const users = initStorage('users', mockUsersData);
  const newUser = { ...userData, id: Date.now() };
  localStorage.setItem('users', JSON.stringify([...users, newUser]));
  return newUser;
}

export async function loginUser(credentials) {
  await delay(500);
  const users = initStorage('users', mockUsersData);
  const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
  if (user) {
    // Keep both keys while older pages migrate to the currentUser session key.
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify({
      ...user,
      userType: user.role === 'FREELANCER' ? 'freelancer' : 'client'
    }));
    // Provide a mock token and the user
    return { token: 'mock-jwt-token', user, role: user.role, id: user.id };
  }
  throw new Error("Invalid credentials");
}

export async function updateUser(userId, userData) {
  await delay(400);
  const users = initStorage('users', mockUsersData);
  const updatedUsers = users.map(u => u.id === parseInt(userId) ? { ...u, ...userData } : u);
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return userData;
}

export async function fetchContracts() {
  await delay(400);
  return initStorage('contracts', mockContractsData);
}

export async function fetchContractById(contractId) {
  await delay(300);
  const contracts = initStorage('contracts', mockContractsData);
  return contracts.find(c => c.id === parseInt(contractId));
}

export async function updateContract(contractId, contractData) {
  await delay(400);
  const contracts = initStorage('contracts', mockContractsData);
  const updatedContracts = contracts.map(c => c.id === parseInt(contractId) ? { ...c, ...contractData } : c);
  localStorage.setItem('contracts', JSON.stringify(updatedContracts));
  return contractData;
}

export async function fetchProposals() {
  await delay(300);
  return initStorage('proposals', mockProposalsData);
}

export async function fetchPayments() {
  await delay(300);
  return initStorage('payments', []);
}

export async function submitPayment(paymentData) {
  await delay(500);
  const payments = initStorage('payments', []);
  const newPayment = { ...paymentData, id: Date.now(), status: 'COMPLETED' };
  localStorage.setItem('payments', JSON.stringify([...payments, newPayment]));
  return newPayment;
}

export async function fetchProposalsByUser(userId) {
  await delay(300);
  const proposals = initStorage('proposals', mockProposalsData);
  return proposals.filter(p => p.freelancerId === parseInt(userId));
}

export async function fetchPaymentsByFreelancer(freelancerId) {
  await delay(300);
  const payments = initStorage('payments', []);
  return payments.filter(p => p.freelancerId === parseInt(freelancerId));
}

export async function fetchPaymentsByClient(clientId) {
  await delay(300);
  const payments = initStorage('payments', []);
  return payments.filter(p => p.clientId === parseInt(clientId));
}

export async function fetchContractsByProposals(proposalIds) {
  await delay(300);
  const contracts = initStorage('contracts', mockContractsData);
  return contracts.filter(c => proposalIds.includes(c.proposalId));
}

export async function updateProposal(proposalId, proposalData) {
  await delay(400);
  const proposals = initStorage('proposals', mockProposalsData);
  const updatedProposals = proposals.map(p => p.id === parseInt(proposalId) ? { ...p, ...proposalData } : p);
  localStorage.setItem('proposals', JSON.stringify(updatedProposals));
  return proposalData;
}

export async function submitContract(contractData) {
  await delay(500);
  const contracts = initStorage('contracts', mockContractsData);
  const newContract = { ...contractData, id: Date.now() };
  localStorage.setItem('contracts', JSON.stringify([...contracts, newContract]));
  return newContract;
}

export async function submitReview(reviewData) {
  await delay(400);
  const reviews = initStorage('reviews', []);
  const newReview = { ...reviewData, id: Date.now() };
  localStorage.setItem('reviews', JSON.stringify([...reviews, newReview]));
  return newReview;
}

export async function fetchReviewsForUser(userId) {
  await delay(300);
  const reviews = initStorage('reviews', []);
  return reviews.filter(r => r.targetUserId === parseInt(userId));
}

export async function fetchReviewsByContract(contractId) {
  await delay(300);
  const reviews = initStorage('reviews', []);
  return reviews.filter(r => r.contractId === parseInt(contractId));
}
