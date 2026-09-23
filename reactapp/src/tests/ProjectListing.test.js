import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProjectListing from "../components/ProjectListing";

global.fetch = jest.fn();

const mockProjects = [
  {
    id: 1,
    title: "Project One",
    description: "This is a test description for Project One that is quite long and informative.",
    minBudget: 100,
    maxBudget: 200,
    deadline: "2023-12-31",
    skills: ["React", "Node.js"],
  },
  {
    id: 2,
    title: "Another Project",
    description: "Short desc.",
    minBudget: 50,
    maxBudget: 400,
    deadline: "2023-06-30",
    skills: ["Java"],
  },
];

describe("ProjectListing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderProjectListingPage", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });
    const onViewDetails = jest.fn();
    render(<ProjectListing onViewDetails={onViewDetails} />);

    expect(screen.getByText(/Loading projects/i)).toBeInTheDocument();
    await screen.findByText("Project One");
    expect(screen.getByText("Project One")).toBeInTheDocument();
    expect(screen.getByText("Another Project")).toBeInTheDocument();
    expect(screen.getAllByText(/Budget:/)).toHaveLength(2);
    expect(screen.getAllByText("View Details").length).toBe(2);
    // Button works
    fireEvent.click(screen.getAllByText("View Details")[0]);
    expect(onViewDetails).toHaveBeenCalledWith(1);
  });

  it("handleEmptyProjectList", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    render(<ProjectListing />);
    await screen.findByText(/No projects available/i);
  });

  it("shows error if backend fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to retrieve projects"));
    render(<ProjectListing />);
    await screen.findByTestId("project-listing-error");
    expect(screen.getByTestId("project-listing-error")).toHaveTextContent(
      /Failed to retrieve projects/
    );
  });
});
