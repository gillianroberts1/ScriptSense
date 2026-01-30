import { describe, it, expect, beforeEach } from "vitest";
import { saveTraining, loadTraining } from "./localStorage";

describe("localStorage training utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saveTraining saves training data to localStorage", () => {
    const training = { topic: "Variables", progress: 80 };
    saveTraining(training);
    const stored = localStorage.getItem("trainingData");
    expect(stored).toBe(JSON.stringify(training));
  });

  it("loadTraining returns the parsed training data", () => {
    const training = { topic: "Functions", progress: 100 };
    localStorage.setItem("trainingData", JSON.stringify(training));
    expect(loadTraining()).toEqual(training);
  });

  it("loadTraining returns null if nothing is stored", () => {
    expect(loadTraining()).toBeNull();
  });

  it("handles malformed JSON in trainingData gracefully", () => {
    localStorage.setItem("trainingData", "not-json");
    expect(() => loadTraining()).not.toThrow();
    expect(loadTraining()).toBeNull();
  });
});
