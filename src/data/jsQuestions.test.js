import { describe, it, expect } from "vitest";
import jsQuestions, { jsQuizMeta } from "./jsQuestions";

describe("jsQuestions", () => {
  it("should export an array of questions", () => {
    expect(Array.isArray(jsQuestions)).toBe(true);
    expect(jsQuestions.length).toBeGreaterThan(0);
  });

  it("each question should have required properties", () => {
    jsQuestions.forEach((question) => {
      expect(question).toHaveProperty("id");
      expect(question).toHaveProperty("questionText");
      expect(question).toHaveProperty("options");
      expect(question).toHaveProperty("correctOptionIndex");
      expect(question).toHaveProperty("conceptId");
    });
  });

  it("each question should have valid option count and correct answer index", () => {
    jsQuestions.forEach((question) => {
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options.length).toBeGreaterThan(0);
      expect(question.correctOptionIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctOptionIndex).toBeLessThan(question.options.length);
    });
  });

  it("question IDs should be unique", () => {
    const ids = jsQuestions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should export jsQuizMeta with language property", () => {
    expect(jsQuizMeta).toBeDefined();
    expect(jsQuizMeta).toHaveProperty("language");
    expect(typeof jsQuizMeta.language).toBe("string");
  });

  it("jsQuizMeta language should not be empty", () => {
    expect(jsQuizMeta.language).toBeTruthy();
  });

  it("all concept IDs should be non-empty strings", () => {
    jsQuestions.forEach((question) => {
      expect(typeof question.conceptId).toBe("string");
      expect(question.conceptId.length).toBeGreaterThan(0);
    });
  });

  it("all question texts should be non-empty strings", () => {
    jsQuestions.forEach((question) => {
      expect(typeof question.questionText).toBe("string");
      expect(question.questionText.length).toBeGreaterThan(0);
    });
  });
});
