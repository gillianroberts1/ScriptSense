import React from "react";
import "./ResultsCard.css";
import { getAssessment } from "../utils/assessment";

export default function ResultsCard({
  conceptId,
  totalQuestions,
  correctAnswers,
}) {
  const percent =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;
  const { level } = getAssessment(percent);

  return (
    <div className="results-card">
      <div className="results-card-header">{conceptId}</div>
      <div className="results-card-body">
        <div>Questions: {totalQuestions}</div>
        <div>Correct: {correctAnswers}</div>
        <div>Accuracy: {percent}%</div>
        <div>Level: {level}</div>
      </div>
    </div>
  );
}
