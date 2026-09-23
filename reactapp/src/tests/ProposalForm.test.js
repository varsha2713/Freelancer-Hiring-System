import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProposalForm from "../components/ProposalForm";
global.fetch = jest.fn();

describe("ProposalForm", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it("validateProposalForm", async () => {
    render(<ProposalForm projectId={1} />);
    // Initially, the submit button should be disabled
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
    // Enter invalid values; button should remain disabled
    fireEvent.change(screen.getByTestId("bid-input"), { target: { value: "-4" } });
    fireEvent.change(screen.getByTestId("proposal-textarea"), { target: { value: "short" } });
    fireEvent.change(screen.getByTestId("days-input"), { target: { value: "0" } });
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
    // Enter valid values; button should become enabled
    fireEvent.change(screen.getByTestId("bid-input"), { target: { value: "100" } });
    fireEvent.change(screen.getByTestId("proposal-textarea"), { target: { value: "I have 10 years experience in similar projects, will deliver!".repeat(2) } });
    fireEvent.change(screen.getByTestId("days-input"), { target: { value: "20" } });
    expect(screen.getByTestId("submit-btn")).not.toBeDisabled();
  });

  it("submitProposalSuccess", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
    render(<ProposalForm projectId={1} />);
    fireEvent.change(screen.getByTestId("bid-input"), { target: { value: "100" } });
    fireEvent.change(screen.getByTestId("proposal-textarea"), { target: { value: "I have 10 years experience in similar projects, will deliver!".repeat(2) } });
    fireEvent.change(screen.getByTestId("days-input"), { target: { value: "15" } });
    fireEvent.click(screen.getByTestId("submit-btn"));
    expect(screen.getByText(/Submitting.../i)).toBeInTheDocument();
    await screen.findByText(/Your proposal has been submitted successfully/i);
  });

  it("shows API error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "You have already submitted a proposal for this project" })
    });
    render(<ProposalForm projectId={77} />);
    fireEvent.change(screen.getByTestId("bid-input"), { target: { value: "80" } });
    fireEvent.change(screen.getByTestId("proposal-textarea"), { target: { value: "I have been working with React for a very long time and can help...".repeat(2) } });
    fireEvent.change(screen.getByTestId("days-input"), { target: { value: "13" } });
    fireEvent.click(screen.getByTestId("submit-btn"));
    await waitFor(() =>
      expect(screen.getByTestId("submit-error")).toHaveTextContent(
        "You have already submitted a proposal for this project"
      )
    );
  });

  it("disables submit button when invalid", async () => {
    render(<ProposalForm projectId={1} />);
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
    fireEvent.change(screen.getByTestId("bid-input"), { target: { value: "50" } });
    fireEvent.change(screen.getByTestId("proposal-textarea"), { target: { value: "ok".repeat(25) } });
    fireEvent.change(screen.getByTestId("days-input"), { target: { value: "1" } });
    // Now form is valid
    expect(screen.getByTestId("submit-btn")).not.toBeDisabled();
  });
});
