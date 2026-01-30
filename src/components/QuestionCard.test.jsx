import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QuestionCard from "./QuestionCard";
import jsQuestions from "../data/jsQuestions";

describe("QuestionCard", () => {
  const sampleQuestion = jsQuestions[0];
  it("renders the question text and options", () => {
    render(
      <QuestionCard
        questions={sampleQuestion}
        selectedOptionIndex={null}
        onSelectOption={() => {}}
        onNext={() => {}}
        isLastQuestion={false}
      />
    );
    // Question text
    expect(screen.getByText(sampleQuestion.questionText)).toBeInTheDocument();
    // All options
    sampleQuestion.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls onSelectOption with correct index when an option is clicked", () => {
    const handleSelect = vi.fn();
    render(
      <QuestionCard
        questions={sampleQuestion}
        selectedOptionIndex={null}
        onSelectOption={handleSelect}
        onNext={() => {}}
        isLastQuestion={false}
      />
    );
    const optionButtons = screen.getAllByRole("button", { name: /.*/ });
    // Only option buttons, not the Next button
    const filteredButtons = optionButtons.filter((btn) =>
      sampleQuestion.options.includes(btn.textContent)
    );
    filteredButtons[2].click();
    expect(handleSelect).toHaveBeenCalledWith(2);
  });

  it("applies selected class and aria-pressed to the selected option", () => {
    render(
      <QuestionCard
        questions={sampleQuestion}
        selectedOptionIndex={1}
        onSelectOption={() => {}}
        onNext={() => {}}
        isLastQuestion={false}
      />
    );
    const optionButtons = screen.getAllByRole("button", { name: /.*/ });
    const filteredButtons = optionButtons.filter((btn) =>
      sampleQuestion.options.includes(btn.textContent)
    );
    filteredButtons.forEach((btn, idx) => {
      if (idx === 1) {
        expect(btn.className).toMatch(/selected/);
        expect(btn).toHaveAttribute("aria-pressed", "true");
      } else {
        expect(btn.className).not.toMatch(/selected/);
        expect(btn).toHaveAttribute("aria-pressed", "false");
      }
    });
  });
  it("disables the Next button when no option is selected", () => {
    render(
      <QuestionCard
        questions={sampleQuestion}
        selectedOptionIndex={null}
        onSelectOption={() => {}}
        onNext={() => {}}
        isLastQuestion={false}
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });
  it("enables the Next button when an option is selected", () => {
    render(
      <QuestionCard
        questions={sampleQuestion}
        selectedOptionIndex={0}
        onSelectOption={() => {}}
        onNext={() => {}}
        isLastQuestion={false}
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeEnabled();
  });
  it("calls onNext when the Next button is clicked", () => {
    const handleNext = vi.fn();
    render(
      <QuestionCard
        questions={sampleQuestion}
        selectedOptionIndex={0}
        onSelectOption={() => {}}
        onNext={handleNext}
        isLastQuestion={false}
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    nextButton.click();
    expect(handleNext).toHaveBeenCalled();
  });
  it("changes the next button label to finish when isLastQuestion is true", () => {
    render(
      <QuestionCard
        questions={sampleQuestion}
        selectedOptionIndex={0}
        onSelectOption={() => {}}
        onNext={() => {}}
        isLastQuestion={true}
      />
    );
    const nextButton = screen.getByRole("button", { name: /finish/i });
    expect(nextButton).toBeInTheDocument();
  });
  it("matches the snapshot for the default QuestionCard", () => {
    const { asFragment } = render(
      <QuestionCard
        questions={sampleQuestion}
        selectedOptionIndex={null}
        onSelectOption={() => {}}
        onNext={() => {}}
        isLastQuestion={false}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
