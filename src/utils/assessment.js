// Assessment utility for ScriptSense

export function getAssessment(percent) {
  if (percent >= 90)
    return { percent, level: "advanced", comment: "JavaScript Prodigy" };
  if (percent >= 75)
    return { percent, level: "intermediate", comment: "Rising Star" };
  if (percent >= 50)
    return { percent, level: "emerging", comment: "Getting There!" };
  return { percent, level: "beginner", comment: "Keep Practicing" };
}
