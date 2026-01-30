import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JSQuizPage.css";
import QuestionCard from "../components/QuestionCard";
import jsQuestions, { jsQuizMeta } from "../data/jsQuestions";
import { saveResults } from "../utils/localStorage";

export default function JSQuizPage() {
  const language = jsQuizMeta?.language || "JavaScript";
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = jsQuestions[currentIndex];
  const totalQuestions = jsQuestions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectOption = (optionIdx) => {
    setSelectedOptionIndex(optionIdx);
  };

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedOptionIndex;
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Save result to local storage before navigating
      const now = new Date();
      const totalQuestions = jsQuestions.length;
      const totalCorrect = jsQuestions.reduce(
        (score, q, idx) =>
          score + (updatedAnswers[idx] === q.correctOptionIndex ? 1 : 0),
        0
      );
      const percent =
        totalQuestions > 0
          ? Math.round((totalCorrect / totalQuestions) * 100)
          : 0;
      const result = {
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        totalQuestions,
        totalCorrect,
        score: percent,
        language,
        answers: updatedAnswers,
      };
      saveResults(result);
      // Navigate to results page with answers as state
      navigate("/results", { state: { answers: updatedAnswers } });
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionIndex(null);
    }
  };

  // No local results rendering; handled by ResultsPage

  return (
    <div className="quiz-page">
      <h2 className="quiz-title">JavaScript Quiz</h2>
      <QuestionCard
        questions={{
          ...currentQuestion,
          id: currentIndex + 1,
          total: totalQuestions,
        }}
        selectedOptionIndex={selectedOptionIndex}
        onSelectOption={handleSelectOption}
        onNext={handleNext}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
}
