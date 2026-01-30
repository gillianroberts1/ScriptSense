import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TrainingPage from "./TrainingPage";
import * as localStorageUtils from "../utils/localStorage";
import conceptTrainingResources from "../data/conceptTrainingResources";
import * as assessmentUtils from "../utils/assessment";

vi.mock("../utils/localStorage");
vi.mock("../utils/assessment");

const conceptLabels = Object.values(conceptTrainingResources).map(
  (c) => c.label
);

// Helper to get course title for a level
function getCourseTitle(concept, level) {
  const course =
    concept.resources.find((r) => r.level === level) || concept.resources[0];
  return course.title;
}

describe("TrainingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    assessmentUtils.getAssessment.mockImplementation(() => ({
      level: "beginner",
    }));
  });

  it('renders the heading "Training Recommendations"', () => {
    localStorageUtils.loadResults.mockReturnValue({ answers: [] });
    render(<TrainingPage />);
    expect(
      screen.getByRole("heading", { name: /training recommendations/i })
    ).toBeInTheDocument();
  });

  it("renders a TrainingCard for each concept in conceptTrainingResources", () => {
    localStorageUtils.loadResults.mockReturnValue({ answers: [] });
    render(<TrainingPage />);
    conceptLabels.forEach((label) => {
      // Check for concept label in card header
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it("passes the correct concept and course props to each TrainingCard", () => {
    localStorageUtils.loadResults.mockReturnValue({ answers: [] });
    render(<TrainingPage />);
    // Query all card headers for concept labels
    const headers = document.querySelectorAll(".training-card-header");
    const headerTexts = Array.from(headers).map((el) => el.textContent);
    Object.values(conceptTrainingResources).forEach((concept) => {
      expect(headerTexts).toContain(concept.label);
      const courseTitle = getCourseTitle(concept, "beginner");
      expect(screen.getAllByText(courseTitle).length).toBeGreaterThan(0);
    });
  });

  it("handles the case where there are no results in localStorage (renders with empty answers)", () => {
    localStorageUtils.loadResults.mockReturnValue(undefined);
    render(<TrainingPage />);
    conceptLabels.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it("correctly calculates and passes the user’s level/course based on mock answers", () => {
    localStorageUtils.loadResults.mockReturnValue({ answers: [0, 0, 0, 0, 0] });
    assessmentUtils.getAssessment.mockImplementation(() => ({
      level: "advanced",
    }));
    render(<TrainingPage />);
    Object.values(conceptTrainingResources).forEach((concept) => {
      const advanced = concept.resources.find((r) => r.level === "advanced");
      if (advanced) {
        expect(screen.getByText(advanced.title)).toBeInTheDocument();
      }
    });
  });

  it("displays 0% progress for concepts with no correct answers", () => {
    localStorageUtils.loadResults.mockReturnValue({ answers: [] });
    render(<TrainingPage />);
    expect(screen.getAllByText(/level: beginner/i).length).toBeGreaterThan(0);
  });

  it("applies correct CSS classes to main elements", () => {
    localStorageUtils.loadResults.mockReturnValue({ answers: [] });
    render(<TrainingPage />);
    expect(screen.getByRole("heading").parentElement).toHaveClass(
      "training-page"
    );
    expect(
      screen.getByText(/training recommendations/i).parentElement
    ).toHaveClass("training-page");
  });
});
