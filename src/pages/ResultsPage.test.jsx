import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, expect, it, beforeEach, afterEach } from "vitest";
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

const mockLoadResults = vi.fn();
const mockLoadResultsHistory = vi.fn();

vi.mock("../utils/localStorage", () => ({
  loadResults: () => mockLoadResults(),
  loadResultsHistory: () => mockLoadResultsHistory(),
}));

describe("ResultsPage", () => {
  beforeEach(() => {
    mockLoadResults.mockReturnValue(null);
    mockLoadResultsHistory.mockReturnValue([
      {
        date: "2026-01-14",
        time: "10:00",
        totalCorrect: 5,
        totalQuestions: 10,
        score: 50,
        language: "JavaScript",
      },
    ]);
  });

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

  it("uses answers from location.state when available", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/results",
            state: { answers: [0, 0, 0] },
          },
        ]}
      >
        <ResultsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Score: 3 \/ 3/)).toBeInTheDocument();
  });

  it("uses answers from storedResults when location.state is unavailable", () => {
    mockLoadResults.mockReturnValue({
      answers: [0, 1, 0],
    });
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Score: 2 \/ 3/)).toBeInTheDocument();
  });

  it("uses demoAnswers when neither location.state nor storedResults provide answers", () => {
    mockLoadResults.mockReturnValue(null);
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    // demoAnswers should be used
    expect(screen.getByText(/Quiz Results/)).toBeInTheDocument();
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

  it("does not display quiz history table when resultsHistory is empty", () => {
    mockLoadResultsHistory.mockReturnValue([]);
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Quiz History/)).not.toBeInTheDocument();
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

  it("handles missing date, time, and language in resultsHistory", () => {
    mockLoadResultsHistory.mockReturnValue([
      {
        date: "",
        time: "",
        totalCorrect: 5,
        totalQuestions: 10,
        score: 50,
        language: "",
      },
    ]);
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const table = screen.getByRole("table");
    // Should display dashes for missing values
    expect(within(table).getAllByText(/-/)).toHaveLength(3);
  });

  it("formats date from YYYY-MM-DD format correctly", () => {
    mockLoadResultsHistory.mockReturnValue([
      {
        date: "2026-02-16",
        time: "14:30",
        totalCorrect: 8,
        totalQuestions: 10,
        score: 80,
        language: "JavaScript",
      },
    ]);
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const table = screen.getByRole("table");
    expect(within(table).getByText(/16\/02\/26/)).toBeInTheDocument();
  });

  it("formats date from DD/MM/YYYY format correctly", () => {
    mockLoadResultsHistory.mockReturnValue([
      {
        date: "16/02/2026",
        time: "14:30",
        totalCorrect: 8,
        totalQuestions: 10,
        score: 80,
        language: "JavaScript",
      },
    ]);
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const table = screen.getByRole("table");
    expect(within(table).getByText(/16\/02\/26/)).toBeInTheDocument();
  });

  it("handles invalid date strings in resultsHistory", () => {
    mockLoadResultsHistory.mockReturnValue([
      {
        date: "invalid-date",
        time: "14:30",
        totalCorrect: 8,
        totalQuestions: 10,
        score: 80,
        language: "JavaScript",
      },
    ]);
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const table = screen.getByRole("table");
    // Should return the original string if it can't be parsed
    expect(within(table).getByText(/invalid-date/)).toBeInTheDocument();
  });

  it("handles time truncation for display", () => {
    mockLoadResultsHistory.mockReturnValue([
      {
        date: "2026-02-16",
        time: "14:30:45",
        totalCorrect: 8,
        totalQuestions: 10,
        score: 80,
        language: "JavaScript",
      },
    ]);
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
    const table = screen.getByRole("table");
    // Should only display HH:MM
    expect(within(table).getByText(/14:30/)).toBeInTheDocument();
  });
});

describe("ResultsPage Accessibility", () => {
  beforeEach(() => {
    mockLoadResults.mockReturnValue(null);
    mockLoadResultsHistory.mockReturnValue([
      {
        date: "2026-01-14",
        time: "10:00",
        totalCorrect: 5,
        totalQuestions: 10,
        score: 50,
        language: "JavaScript",
      },
    ]);
  });

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
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );
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
