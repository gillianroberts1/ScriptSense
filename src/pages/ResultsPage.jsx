import React, { useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./ResultsPage.css";
import ResultsCard from "../components/ResultsCard";
import jsQuestions, { jsQuizMeta } from "../data/jsQuestions";
import { getAssessment } from "../utils/assessment";
import { loadResults, loadResultsHistory } from "../utils/localStorage";

// Demo answers for preview; replace with real answers from state or props
const demoAnswers = [
  1, 0, 2, 2, 1, 1, 0, 1, 1, 2, 0, 1, 0, 1, 2, 1, 0, 3, 3, 0, 1, 1, 1, 0, 0, 1,
  2, 0, 0, 3,
];

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

function formatHistoryDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  if (!isNaN(d)) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  }
  // Fallback: try to extract from string (e.g. YYYY-MM-DD or DD/MM/YYYY)
  const parts = dateString.match(/(\d{2,4})[\/-](\d{1,2})[\/-](\d{1,4})/);
  if (parts) {
    let day, month, year;
    if (parts[1].length === 4) {
      // YYYY-MM-DD
      year = parts[1].slice(2);
      month = parts[2].padStart(2, "0");
      day = parts[3].padStart(2, "0");
    } else {
      // DD/MM/YYYY or similar
      day = parts[1].padStart(2, "0");
      month = parts[2].padStart(2, "0");
      year = parts[3].slice(-2);
    }
    return `${day}/${month}/${year}`;
  }
  return dateString;
}
// ...existing code...

export default function ResultsPage() {
  const location = useLocation();
  // Try to load from localStorage first
  const storedResults = loadResults();
  // Always initialize from localStorage on mount
  const [resultsHistory, setResultsHistory] = useState(() =>
    loadResultsHistory(),
  );

  const now = useMemo(() => new Date(), []);
  const testDate = useMemo(() => now.toLocaleDateString(), [now]);
  const language = jsQuizMeta.language;

  const answers = useMemo(() => {
    if (location.state && Array.isArray(location.state.answers)) {
      return location.state.answers;
    }
    if (storedResults && Array.isArray(storedResults.answers)) {
      return storedResults.answers;
    }
    return demoAnswers;
  }, [location.state, storedResults]);

  const totalQuestions = jsQuestions.length;
  const totalCorrect = useMemo(
    () =>
      jsQuestions.reduce(
        (score, q, idx) =>
          score + (answers[idx] === q.correctOptionIndex ? 1 : 0),
        0,
      ),
    [answers],
  );
  const scorePercent = useMemo(
    () =>
      totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0,
    [totalCorrect, totalQuestions],
  );
  const overallAssessment = useMemo(
    () => getAssessment(scorePercent),
    [scorePercent],
  );
  const conceptStats = useMemo(
    () => getConceptStats(jsQuestions, answers),
    [answers],
  );

  // Delete a result by index
  const handleDeleteResult = useCallback((idx) => {
    setResultsHistory((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      localStorage.setItem("quizResultsHistory", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Collapsible logic for concept breakdown
  const [showConcepts, setShowConcepts] = useState(false);

  return (
    <div className="results-page">
      <h2>Quiz Results</h2>
      <div className="results-meta">
        <div>Date: {testDate}</div>
        <div>Language: {language}</div>
      </div>
      <div className="results-summary">
        <div>
          Score: {totalCorrect} / {totalQuestions}
        </div>
        <div>Accuracy: {overallAssessment.percent}%</div>
        <div>Level: {overallAssessment.level}</div>
        <div className="results-overall-comment">
          {overallAssessment.comment}
        </div>
      </div>
      <button
        className="collapsible-toggle"
        onClick={() => setShowConcepts((prev) => !prev)}
        aria-expanded={showConcepts}
        aria-controls="concept-breakdown-list"
      >
        {showConcepts ? "▼" : "►"} Concept Breakdown
      </button>
      {showConcepts && (
        <div
          className="results-cards-list"
          id="concept-breakdown-list"
          data-testid="concept-breakdown-list"
        >
          {Object.entries(conceptStats).map(([conceptId, stats]) => (
            <ResultsCard
              key={conceptId}
              conceptId={conceptId}
              totalQuestions={stats.total}
              correctAnswers={stats.correct}
              level={stats.level}
            />
          ))}
        </div>
      )}

      {/* Results History Table */}
      {resultsHistory.length > 0 && (
        <div className="results-history">
          <h3>Quiz History</h3>
          <table className="results-history-table">
            <thead>
              <tr className="results-history-row results-history-header-row">
                <th>Date</th>
                <th>Time</th>
                <th>Score</th>
                <th>%</th>
                <th>Language</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {resultsHistory
                .slice()
                .reverse()
                .map((result, idx, arr) => (
                  <tr
                    key={arr.length - 1 - idx}
                    className="results-history-row"
                  >
                    <td>{formatHistoryDate(result.date)}</td>
                    <td>{result.time ? result.time.slice(0, 5) : "-"}</td>
                    <td>
                      {result.totalCorrect} / {result.totalQuestions}
                    </td>
                    <td>{result.score}%</td>
                    <td>{result.language || "-"}</td>
                    <td>
                      <button
                        className="results-history-delete-btn"
                        title="Delete this result"
                        onClick={() =>
                          handleDeleteResult(resultsHistory.length - 1 - idx)
                        }
                      >
                        <span className="delete-btn-label">Delete</span>
                        <span className="delete-btn-x">×</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
