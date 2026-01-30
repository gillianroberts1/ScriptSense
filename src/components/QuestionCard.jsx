import React from "react";
import "./QuestionCard.css";

const QuestionCard = ({
  questions,
  selectedOptionIndex,
  onSelectOption,
  onNext,
  isLastQuestion,
}) => {
  const { id, questionText, options } = questions;

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-progress">
          Question {id} of {questions.total || 30}
        </span>
      </div>
      <div className="question-text">{questionText}</div>
      <div className="options-list">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`option-btn${
              selectedOptionIndex === idx ? " selected" : ""
            }`}
            onClick={() => onSelectOption(idx)}
            type="button"
            aria-pressed={selectedOptionIndex === idx}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="question-footer">
        <button
          className="primary-btn"
          onClick={onNext}
          disabled={selectedOptionIndex === null}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
