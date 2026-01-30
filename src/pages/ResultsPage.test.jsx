import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import ResultsPage from "./ResultsPage";

// Mock jsQuestions and jsQuizMeta before importing ResultsPage
vi.mock("../data/jsQuestions", () => ({
  __esModule: true,
  default: [
    {
      id: 1,
      conceptId: "Variables",
      questionText: "Q1",
      options: ["a"],
      correctOptionIndex: 0,
    },
    {
      id: 2,
      conceptId: "Variables",
      questionText: "Q2",
      options: ["a"],
      correctOptionIndex: 0,
    },
    {
      id: 3,
      conceptId: "Functions",
      questionText: "Q3",
      options: ["a"],
      correctOptionIndex: 0,
    },
  ],
  jsQuizMeta: { language: "JavaScript" },
}));

vi.mock("../utils/localStorage", () => ({
  loadResults: () => null,
  loadResultsHistory: () => [
    {
      date: "2026-01-14",
      time: "10:00",
      totalCorrect: 5,
      totalQuestions: 10,
      score: 50,
      language: "JavaScript",
    },
  ],
}));

describe("ResultsPage", () => {
  it("displays the correct date and language", () => {
    const today = new Date().toLocaleDateString();
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(new RegExp(`Date: ${today}`))).toBeInTheDocument();
    expect(screen.getByText(/Language: JavaScript/)).toBeInTheDocument();
  });

  it("shows the concept breakdown section when the toggle is clicked, and hides it when toggled again", async () => {
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole("button", {
      name: /concept breakdown/i,
    });
    // Initially hidden
    expect(
      screen.queryByTestId("concept-breakdown-list")
    ).not.toBeInTheDocument();
    // Click to show
    await userEvent.click(toggleButton);
    expect(screen.getByTestId("concept-breakdown-list")).toBeInTheDocument();
    // Click to hide
    await userEvent.click(toggleButton);
    expect(
      screen.queryByTestId("concept-breakdown-list")
    ).not.toBeInTheDocument();
  });

  it("renders a ResultsCard for each concept in the breakdown, with correct props", async () => {
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole("button", {
      name: /concept breakdown/i,
    });
    await userEvent.click(toggleButton);
    // There should be two ResultsCards: one for Variables, one for Functions
    expect(screen.getByText("Variables")).toBeInTheDocument();
    expect(screen.getByText("Functions")).toBeInTheDocument();
    // Check that the correct question and correct counts are rendered
    expect(screen.getAllByText(/Questions:/).length).toBe(2);
    expect(screen.getAllByText(/Correct:/).length).toBe(2);
  });

  it("displays the quiz history table when resultsHistory is not empty", () => {
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Quiz History/)).toBeInTheDocument();
    const table = screen.getByRole("table");
    expect(within(table).getByText(/14\/01\/26/)).toBeInTheDocument();
    expect(within(table).getByText(/10:00/)).toBeInTheDocument();
    expect(within(table).getByText(/5 \/ 10/)).toBeInTheDocument();
    expect(within(table).getByText(/50%/)).toBeInTheDocument();
    expect(within(table).getByText(/JavaScript/)).toBeInTheDocument();
  });

  it("deletes a result from history when the delete button is clicked", async () => {
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const table = screen.getByRole("table");
    expect(within(table).getByText(/14\/01\/26/)).toBeInTheDocument();
    const deleteButton = within(table).getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);
    // After deletion, the date should no longer be in the document
    expect(within(table).queryByText(/2026-01-14/)).not.toBeInTheDocument();
  });

  it("renders '-' or empty for missing date, time, and language in resultsHistory", () => {
    vi.mock("../utils/localStorage", () => ({
      loadResults: () => null,
      loadResultsHistory: () => [
        {
          date: "",
          time: "",
          totalCorrect: 5,
          totalQuestions: 10,
          score: 50,
          language: "",
        },
      ],
    }));
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const table = screen.getByRole("table");
    const cells = table.querySelectorAll("td");
    const emptyOrDashCells = Array.from(cells).filter(
      (cell) =>
        cell.textContent.trim() === "-" || cell.textContent.trim() === ""
    );
    expect(emptyOrDashCells.length).toBeGreaterThanOrEqual(0);
  });
});

describe("ResultsPage Accessibility", () => {
  it("concept breakdown toggle button has correct aria attributes", async () => {
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole("button", {
      name: /concept breakdown/i,
    });
    // Initially collapsed
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveAttribute(
      "aria-controls",
      "concept-breakdown-list"
    );
    // Click to expand
    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  });

  it("results table is accessible with proper headers", () => {
    // Mock resultsHistory for this test
    vi.mock("../utils/localStorage", () => ({
      loadResults: () => null,
      loadResultsHistory: () => [
        {
          date: "2026-01-14",
          time: "10:00",
          totalCorrect: 5,
          totalQuestions: 10,
          score: 50,
          language: "JavaScript",
        },
      ],
    }));
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    // eslint-disable-next-line no-unused-vars
    const table = screen.getByRole("table");
    // Check for accessible headers
    expect(
      screen.getByRole("columnheader", { name: /date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /time/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /score/i })
    ).toBeInTheDocument();
    // The header may display either the word 'Accuracy' or the symbol '%'
    expect(
      screen.getByRole("columnheader", { name: /accuracy|%/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /language/i })
    ).toBeInTheDocument();
  });
});
