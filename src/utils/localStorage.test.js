import { describe, it, expect, beforeEach } from "vitest";
import { saveResults, loadResults } from "./localStorage";

const STORAGE_KEY = "quizResultsHistory";

describe("localStorage utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saveResults saves a result object to localStorage as an array", () => {
    const result = { score: 90, answers: [1, 2, 3] };
    saveResults(result);
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBe(JSON.stringify([result]));
  });

  it("loadResults returns the parsed result object (latest in array)", () => {
    const result = { score: 80, answers: [0, 1, 2] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([result]));
    expect(loadResults()).toEqual(result);
  });

  it("loadResults returns null if nothing is stored", () => {
    expect(loadResults()).toBeNull();
  });

  it("saveResults appends to previous results", () => {
    const first = { score: 50 };
    const second = { score: 100 };
    saveResults(first);
    saveResults(second);
    expect(loadResults()).toEqual(second);
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(history).toEqual([first, second]);
  });

  it("handles malformed JSON in localStorage gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "not-json");
    expect(() => loadResults()).not.toThrow();
    expect(loadResults()).toBeNull();
  });
});
