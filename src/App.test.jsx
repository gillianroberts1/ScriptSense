import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("renders main layout without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("ScriptSense")).toBeInTheDocument();
    expect(screen.getByText("Build Boost Code")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders navigation links for all pages", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    ["Home", "Quiz", "Results", "Training"].forEach((text) => {
      expect(screen.getByRole("link", { name: text })).toBeInTheDocument();
    });
  });

  it("theme toggle button switches between light and dark modes", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const btn = screen.getByLabelText(/toggle light\/dark mode/i);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("theme is persisted in localStorage", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const btn = screen.getByLabelText(/toggle light\/dark mode/i);
    fireEvent.click(btn);
    expect(window.localStorage.getItem("theme")).toBe("dark");
    fireEvent.click(btn);
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  it("shows Suspense fallback while loading lazy pages", async () => {
    // Simulate navigation to /training
    render(
      <MemoryRouter initialEntries={["/training"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("NavLink highlights the active route", () => {
    render(
      <MemoryRouter initialEntries={["/results"]}>
        <App />
      </MemoryRouter>
    );
    const resultsLink = screen.getByRole("link", { name: "Results" });
    expect(resultsLink.className).toMatch(/active/);
  });
});
