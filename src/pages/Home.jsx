import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  // Animate briefly on page load
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleStartQuiz = () => {
    setAnimate(true);

    // Let animation play before navigating
    setTimeout(() => {
      navigate("/quiz");
    }, 700);
  };

  return (
    <div className="home-page">
      <h2>Welcome to ScriptSense</h2>

      <p>
        Discover your JavaScript strengths and blind spots. Ready to improve?
      </p>

      <button
        className="start-quiz-btn"
        onClick={handleStartQuiz}
      >
        Start Quiz
      </button>

      {/* Icon now below the button */}
      <img
        src="/icon.png"
        alt="ScriptSense icon"
        className={`scriptsense-icon ${animate ? "animate" : ""}`}
      />
    </div>
  );
}
