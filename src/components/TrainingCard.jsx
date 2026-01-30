import React from "react";
import "./TrainingCard.css";

export default function TrainingCard({ concept, course }) {
  if (!course) return null;
  return (
    <div className="training-card">
      <div className="training-card-header">{concept}</div>
      <div className="training-card-title">{course.title}</div>
      <div className="training-card-level">Level: {course.level}</div>
      <a
        className="training-card-link"
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Course
      </a>
    </div>
  );
}
