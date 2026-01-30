import React, { createContext, useContext, useState, useEffect } from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";

// Theme context for global theme state
const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Layout() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="app-container">
      <header className="app-header" style={{ position: "relative" }}>
        <h1 className="app-title">ScriptSense</h1>
        <p className="app-tagline">Build Boost Code</p>
        <button
          className={`theme-toggle-btn${theme === "dark" ? " dark" : " light"}`}
          style={{ position: "absolute", top: 20, right: 20 }}
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
        >
          {theme === "light" ? (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span role="img" aria-label="moon">
                ☀️🌙
              </span>
            </span>
          ) : (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span role="img" aria-label="sun">
                🌙☀️
              </span>
            </span>
          )}
        </button>
      </header>
      <nav className="app-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Quiz
        </NavLink>
        <NavLink
          to="/results"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Results
        </NavLink>
        <NavLink
          to="/training"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Training
        </NavLink>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="quiz"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <JSQuizPage />
              </React.Suspense>
            }
          />
          <Route
            path="results"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ResultsPage />
              </React.Suspense>
            }
          />
          <Route
            path="training"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <TrainingPage />
              </React.Suspense>
            }
          />
          <Route
            path="about"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <About />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

const Home = React.lazy(() => import("./pages/Home"));
const JSQuizPage = React.lazy(() => import("./pages/JSQuizPage"));
const ResultsPage = React.lazy(() => import("./pages/ResultsPage"));
const TrainingPage = React.lazy(() => import("./pages/TrainingPage"));
const About = React.lazy(() => import("./pages/About"));

export default App;
