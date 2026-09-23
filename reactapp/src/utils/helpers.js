
export function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}
export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString();
}
export function truncateText(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
export function validateProposal(bidAmount, proposalText, deliveryDays) {
    const isBidValid = bidAmount > 0;
    const isProposalValid = proposalText.trim().length >= 30;
    const isDaysValid = deliveryDays > 0;
    return isBidValid && isProposalValid && isDaysValid;
}
