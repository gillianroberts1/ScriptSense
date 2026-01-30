import { render, screen, fireEvent } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterAll,
} from "vitest";
import Home from "./Home";

// Mock window.location
const originalLocation = window.location;
beforeAll(() => {
  delete window.location;
  window.location = { href: "", assign: vi.fn() };
});
afterAll(() => {
  window.location = originalLocation;
});

describe("Home", () => {
  beforeEach(() => {
    window.location.href = "";
    if (window.location.assign) window.location.assign.mockClear();
  });

  it("renders the welcome heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /welcome to scriptsense/i })
    ).toBeInTheDocument();
  });

  it("renders the description paragraph", () => {
    render(<Home />);
    expect(
      screen.getByText(/discover your javascript strengths/i)
    ).toBeInTheDocument();
  });

  it("renders the Start Quiz button", () => {
    render(<Home />);
    expect(
      screen.getByRole("button", { name: /start quiz/i })
    ).toBeInTheDocument();
  });

  it("clicking Start Quiz sets window.location.href to /quiz", () => {
    render(<Home />);
    const btn = screen.getByRole("button", { name: /start quiz/i });
    fireEvent.click(btn);
    expect(window.location.href).toBe("/quiz");
  });

  it("applies correct CSS class names", () => {
    render(<Home />);
    expect(screen.getByRole("heading").parentElement).toHaveClass("home-page");
    expect(screen.getByRole("button", { name: /start quiz/i })).toHaveClass(
      "start-quiz-btn"
    );
  });
});
