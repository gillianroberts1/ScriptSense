import conceptTrainingResources from "./conceptTrainingResources";
import { describe, it, expect } from "vitest";

const allowedLevels = ["beginner", "intermediate", "advanced", "emerging"];
const allowedTypes = ["course", "lesson", "learning path"];

function isValidUrl(url) {
  return /^https?:\/\//.test(url);
}

describe("conceptTrainingResources data integrity", () => {
  it("each concept has label, description, and resources array", () => {
    Object.values(conceptTrainingResources).forEach((concept) => {
      expect(typeof concept.label).toBe("string");
      expect(typeof concept.description).toBe("string");
      expect(Array.isArray(concept.resources)).toBe(true);
    });
  });

  it("each resource has id, title, type, level, and url", () => {
    Object.values(conceptTrainingResources).forEach((concept) => {
      concept.resources.forEach((resource) => {
        expect(typeof resource.id).toBe("string");
        expect(typeof resource.title).toBe("string");
        expect(allowedTypes).toContain(resource.type);
        expect(allowedLevels).toContain(resource.level);
        expect(isValidUrl(resource.url)).toBe(true);
      });
    });
  });

  it("no duplicate resource ids across all concepts", () => {
    const ids = [];
    Object.values(conceptTrainingResources).forEach((concept) => {
      concept.resources.forEach((resource) => {
        ids.push(resource.id);
      });
    });
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("all resource levels are valid", () => {
    Object.values(conceptTrainingResources).forEach((concept) => {
      concept.resources.forEach((resource) => {
        expect(allowedLevels).toContain(resource.level);
      });
    });
  });

  it("all resource URLs are valid", () => {
    Object.values(conceptTrainingResources).forEach((concept) => {
      concept.resources.forEach((resource) => {
        expect(isValidUrl(resource.url)).toBe(true);
      });
    });
  });
});
