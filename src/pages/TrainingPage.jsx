import conceptTrainingResources from "../data/conceptTrainingResources";
import TrainingCard from "../components/TrainingCard";
import { loadResults } from "../utils/localStorage";
import jsQuestions from "../data/jsQuestions";
import { getAssessment } from "../utils/assessment";
import "./TrainingPage.css";

// Helper: get concept stats for a result
function getConceptStats(questions, answers) {
  const conceptGroups = {};
  questions.forEach((q, idx) => {
    if (!conceptGroups[q.conceptId]) {
      conceptGroups[q.conceptId] = { total: 0, correct: 0 };
    }
    conceptGroups[q.conceptId].total++;
    if (answers[idx] === q.correctOptionIndex)
      conceptGroups[q.conceptId].correct++;
  });
  return conceptGroups;
}

// Normalization function for concept matching
function normalize(str) {
  return str
    .replace(/&/gi, "and")
    .replace(/js\b/gi, "javascript")
    .replace(/\bjs/gi, "javascript")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getCourseForLevel(resources, level) {
  if (level === "emerging") {
    return (
      resources.find((r) => r.level === "emerging") ||
      resources.find((r) => r.level === "beginner") ||
      resources[0]
    );
  }
  if (level === "beginner") {
    return resources.find((r) => r.level === "beginner") || resources[0];
  }
  return resources.find((r) => r.level === level) || resources[0];
}

export default function TrainingPage() {
  // Get last result from local storage
  const lastResult = loadResults();
  // If no result, fallback to empty answers
  const answers = lastResult?.answers || [];
  // Get stats per conceptId (sentence case)
  const conceptStats = getConceptStats(jsQuestions, answers);

  // Precompute a normalized map for conceptStats for O(1) lookups
  const normalizedConceptStats = {};
  Object.entries(conceptStats).forEach(([conceptId, stats]) => {
    normalizedConceptStats[normalize(conceptId)] = stats;
  });

  return (
    <div className="training-page">
      <h2>Training Recommendations</h2>
      <div className="training-cards-list">
        {Object.values(conceptTrainingResources).map((concept) => {
          const normalizedLabel = normalize(concept.label);
          const stats = normalizedConceptStats[normalizedLabel] || {
            total: 0,
            correct: 0,
          };
          const percent =
            stats.total > 0
              ? Math.round((stats.correct / stats.total) * 100)
              : 0;
          const { level } = getAssessment(percent);
          const course = getCourseForLevel(concept.resources, level);
          return (
            <TrainingCard
              key={course.id}
              concept={concept.label}
              course={course}
            />
          );
        })}
      </div>
    </div>
  );
}
