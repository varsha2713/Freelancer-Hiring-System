import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProjectDetails from "../components/ProjectDetails";

global.fetch = jest.fn();

const mockProject = {
  id: 1,
  title: "E-commerce Website Development",
  description: "Full project description.",
  minBudget: 1000.0,
  maxBudget: 3000.0,
  deadline: "2023-12-31",
  skills: ["React", "Node.js", "MongoDB"],
  clientId: 101,
  createdAt: "2023-06-15",
};

describe("ProjectDetails", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renderProjectDetailsPage", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockProject });
    render(<ProjectDetails projectId={1} onBack={jest.fn()} />);
    expect(screen.getByTestId("loading-details")).toBeInTheDocument();
    await screen.findByText(/E-commerce Website Development/);
    expect(screen.getByText("E-commerce Website Development")).toBeInTheDocument();
    expect(screen.getByText("Full project description.")).toBeInTheDocument();
    expect(screen.getByText(/Budget:/)).toBeInTheDocument();
    expect(screen.getByText(/Deadline:/)).toBeInTheDocument();
    expect(screen.getByText(/Skills required:/)).toBeInTheDocument();
    expect(screen.getByText(/Client ID:/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Proposal/i })).toBeInTheDocument();
  });

  it("shows error if API fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Project not found with ID: 7"));
    render(<ProjectDetails projectId={7} onBack={jest.fn()} />);
    await screen.findByTestId("project-details-error");
    expect(screen.getByTestId("project-details-error")).toHaveTextContent(
      /Project not found with ID: 7/
    );
  });

  it("toggles proposal form", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockProject });
    render(<ProjectDetails projectId={1} onBack={jest.fn()} />);
    await screen.findByText(/E-commerce Website Development/);
    const btn = screen.getByRole("button", { name: /Submit Proposal/i });
    fireEvent.click(btn);
    expect(screen.getByLabelText(/Bid amount/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Cancel Proposal/i }));
    expect(screen.queryByLabelText(/Bid amount/i)).not.toBeInTheDocument();
  });
});
