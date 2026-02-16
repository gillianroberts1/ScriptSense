import { describe, it, expect } from "vitest";
import { getAssessment } from "./assessment";

describe("getAssessment", () => {
  it("returns 'advanced' level for scores 90 and above", () => {
    const result = getAssessment(90);
    expect(result.percent).toBe(90);
    expect(result.level).toBe("advanced");
    expect(result.comment).toBe("JavaScript Prodigy");
  });

  it("returns 'advanced' level for scores above 90", () => {
    const result = getAssessment(95);
    expect(result.percent).toBe(95);
    expect(result.level).toBe("advanced");
    expect(result.comment).toBe("JavaScript Prodigy");
  });

  it("returns 'intermediate' level for scores 75-89", () => {
    const result = getAssessment(75);
    expect(result.percent).toBe(75);
    expect(result.level).toBe("intermediate");
    expect(result.comment).toBe("Rising Star");
  });

  it("returns 'intermediate' level for scores 80-89", () => {
    const result = getAssessment(85);
    expect(result.percent).toBe(85);
    expect(result.level).toBe("intermediate");
    expect(result.comment).toBe("Rising Star");
  });

  it("returns 'emerging' level for scores 50-74", () => {
    const result = getAssessment(50);
    expect(result.percent).toBe(50);
    expect(result.level).toBe("emerging");
    expect(result.comment).toBe("Getting There!");
  });

  it("returns 'emerging' level for scores 60-74", () => {
    const result = getAssessment(60);
    expect(result.percent).toBe(60);
    expect(result.level).toBe("emerging");
    expect(result.comment).toBe("Getting There!");
  });

  it("returns 'beginner' level for scores below 50", () => {
    const result = getAssessment(40);
    expect(result.percent).toBe(40);
    expect(result.level).toBe("beginner");
    expect(result.comment).toBe("Keep Practicing");
  });

  it("returns 'beginner' level for scores 0-49", () => {
    const result = getAssessment(25);
    expect(result.percent).toBe(25);
    expect(result.level).toBe("beginner");
    expect(result.comment).toBe("Keep Practicing");
  });

  it("returns 'beginner' level for 0 score", () => {
    const result = getAssessment(0);
    expect(result.percent).toBe(0);
    expect(result.level).toBe("beginner");
    expect(result.comment).toBe("Keep Practicing");
  });
});
