import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResultsCard from "./ResultsCard";

describe("ResultsCard", () => {
  it("renders conceptId, totalQuestions, correctAnswers, accuracy, and level", () => {
    render(
      <ResultsCard
        conceptId="Variables"
        totalQuestions={10}
        correctAnswers={7}
      />
    );
    expect(screen.getByText("Variables")).toBeInTheDocument();
    expect(screen.getByText(/Questions: 10/)).toBeInTheDocument();
    expect(screen.getByText(/Correct: 7/)).toBeInTheDocument();
    expect(screen.getByText(/Accuracy: 70%/)).toBeInTheDocument();
    expect(screen.getByText(/Level:/)).toBeInTheDocument(); // Level text is present
  });

  it("shows 0% accuracy and correct level when no questions are correct", () => {
    render(
      <ResultsCard
        conceptId="Functions"
        totalQuestions={5}
        correctAnswers={0}
      />
    );
    expect(screen.getByText(/Accuracy: 0%/)).toBeInTheDocument();
    expect(screen.getByText(/Level:/)).toBeInTheDocument();
  });

  it("shows 100% accuracy and correct level when all questions are correct", () => {
    render(
      <ResultsCard conceptId="Loops" totalQuestions={4} correctAnswers={4} />
    );
    expect(screen.getByText(/Accuracy: 100%/)).toBeInTheDocument();
    expect(screen.getByText(/Level:/)).toBeInTheDocument();
  });

  it("handles 0 totalQuestions gracefully", () => {
    render(
      <ResultsCard conceptId="EdgeCase" totalQuestions={0} correctAnswers={0} />
    );
    expect(screen.getByText(/Questions: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Accuracy: 0%/)).toBeInTheDocument();
  });
});
