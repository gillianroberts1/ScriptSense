import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TrainingCard from "./TrainingCard";

describe("TrainingCard", () => {
  it("renders nothing if no course is provided", () => {
    const { container } = render(<TrainingCard concept="JS" course={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders concept, title, level, and link when course is provided", () => {
    const course = {
      id: "1",
      title: "Intro to JS",
      level: "beginner",
      url: "https://example.com/js",
    };
    render(<TrainingCard concept="JavaScript" course={course} />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Intro to JS")).toBeInTheDocument();
    expect(screen.getByText(/Level: beginner/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view course/i })
    ).toBeInTheDocument();
  });

  it("link has correct href, target, and rel attributes", () => {
    const course = {
      id: "2",
      title: "Advanced JS",
      level: "advanced",
      url: "https://example.com/advanced-js",
    };
    render(<TrainingCard concept="JS" course={course} />);
    const link = screen.getByRole("link", { name: /view course/i });
    expect(link).toHaveAttribute("href", course.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
