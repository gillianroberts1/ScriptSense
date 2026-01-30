import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <h2>Welcome to ScriptSense</h2>
      <p>
        Discover your JavaScript strengths and blind spots. Ready to improve?
      </p>
      <button
        className="start-quiz-btn"
        onClick={() => (window.location.href = "/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
}
