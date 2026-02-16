import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import JSQuizPage from "./JSQuizPage";

vi.mock("../data/jsQuestions", () => ({
  __esModule: true,
  default: [
    {
      id: 1,
      conceptId: "Variables",
      questionText: "What is a variable?",
      options: ["A container", "A function", "A class"],
      correctOptionIndex: 0,
    },
    {
      id: 2,
      conceptId: "Functions",
      questionText: "What is a function?",
      options: ["A block of code", "A variable", "A data type"],
      correctOptionIndex: 0,
    },
  ],
  jsQuizMeta: { language: "JavaScript" },
}));

const mockSaveResults = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../utils/localStorage", () => ({
  saveResults: (result) => mockSaveResults(result),
  loadResults: () => null,
  loadResultsHistory: () => [],
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("JSQuizPage", () => {
  beforeEach(() => {
    mockSaveResults.mockClear();
    mockNavigate.mockClear();
  });

  it("renders the quiz title", () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /JavaScript Quiz/i })).toBeInTheDocument();
  });

  it("renders the first question", () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/What is a variable\?/)).toBeInTheDocument();
  });

  it("renders all options for the first question", () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /A container/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /A function/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /A class/ })).toBeInTheDocument();
  });

  it("selects an option when clicked", async () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );
    const option = screen.getByRole("button", { name: /A container/ });
    await userEvent.click(option);
    expect(option).toHaveAttribute("aria-pressed", "true");
  });

  it("navigates to the next question when Next button is clicked", async () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );
    // Select an option
    const option = screen.getByRole("button", { name: /A container/ });
    await userEvent.click(option);

    // Click Next button
    const nextButton = screen.getByRole("button", { name: /Next/i });
    await userEvent.click(nextButton);

    // Should show the second question
    expect(screen.getByText(/What is a function\?/)).toBeInTheDocument();
  });

  it("disables Next button when no option is selected", () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );
    const nextButton = screen.getByRole("button", { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });

  it("navigates to results page after answering the last question", async () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );

    // Answer first question
    let option = screen.getByRole("button", { name: /A container/ });
    await userEvent.click(option);
    let nextButton = screen.getByRole("button", { name: /Next/i });
    await userEvent.click(nextButton);

    // Answer second question
    option = screen.getByRole("button", { name: /A block of code/ });
    await userEvent.click(option);
    nextButton = screen.getByRole("button", { name: /Finish|Submit/i });
    await userEvent.click(nextButton);

    // Should navigate to results
    expect(mockNavigate).toHaveBeenCalledWith("/results", {
      state: { answers: [0, 0] },
    });
  });

  it("saves results to localStorage before navigating", async () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );

    // Answer first question
    let option = screen.getByRole("button", { name: /A container/ });
    await userEvent.click(option);
    let nextButton = screen.getByRole("button", { name: /Next/i });
    await userEvent.click(nextButton);

    // Answer second question
    option = screen.getByRole("button", { name: /A block of code/ });
    await userEvent.click(option);
    nextButton = screen.getByRole("button", { name: /Finish|Submit/i });
    await userEvent.click(nextButton);

    // Check that saveResults was called
    expect(mockSaveResults).toHaveBeenCalledWith(
      expect.objectContaining({
        totalQuestions: 2,
        totalCorrect: 2,
        score: 100,
        language: "JavaScript",
        answers: [0, 0],
      })
    );
  });

  it("displays the question counter", () => {
    render(
      <MemoryRouter>
        <JSQuizPage />
      </MemoryRouter>
    );
    // Check that question counter is displayed (part of QuestionCard)
    expect(screen.getByText(/1 of 2/i)).toBeInTheDocument();
  });
});
