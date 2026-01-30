import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span className="footer-app">
          &copy; {new Date().getFullYear()} ScriptSense
        </span>
        <span className="footer-ai">Built with AI</span>
        <span className="footer-designer">Designed by CodeCarmenCita</span>
        <div className="link-group">
          <a
            className="footer-link"
            href="https://github.com/gillianroberts1/ScriptSense"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a className="footer-link" href="/about">
            About
          </a>
          <span className="footer-version">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
