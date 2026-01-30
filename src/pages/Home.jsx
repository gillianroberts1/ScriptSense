import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h2>Welcome to ScriptSense</h2>
      <p>
        Discover your JavaScript strengths and blind spots. Ready to improve?
      </p>
      <button
        className="start-quiz-btn"
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
}
