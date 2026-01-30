import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <h2>About ScriptSense</h2>
      <p>
        ScriptSense was created as an experiment to explore the use of
        AI—specifically GitHub Copilot—in engineering and software development.
        The goal was to see how far Copilot could accelerate the process of
        building a real-world web application, and to reflect on the strengths
        and limitations of AI-assisted coding.
      </p>
      <h3>What Worked Well</h3>
      <ul>
        <li>
          Rapid prototyping: Copilot helped generate boilerplate code and UI
          components quickly, speeding up initial development.
        </li>
        <li>
          Context-aware suggestions: The AI provided relevant code completions
          and refactoring ideas based on the current file and project context.
        </li>
        <li>
          Error reduction: Copilot often caught syntax errors and suggested
          fixes before running the code, improving code quality.
        </li>
      </ul>
      <h3>What Didn't Work Well</h3>
      <ul>
        <li>
          Complex logic: For advanced features and business logic, Copilot's
          suggestions were sometimes incomplete or required significant manual
          adjustment.
        </li>
        <li>
          Design consistency: Copilot occasionally produced inconsistent UI or
          styling, requiring manual review and correction for a cohesive look.
        </li>
        <li>
          Documentation and comments: While Copilot generated code, it rarely
          provided helpful documentation or explanations, making maintainability
          harder.
        </li>
      </ul>
      <p>
        Overall, ScriptSense demonstrates both the promise and the current
        limitations of AI in engineering. Copilot is a powerful tool for
        accelerating routine coding tasks, but human expertise is still
        essential for design, architecture, and quality assurance.
      </p>
    </div>
  );
}
