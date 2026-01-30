import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

import Home from "./Home";

describe("Home", () => {
  beforeEach(() => mockedNavigate.mockClear());

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

  it("clicking Start Quiz calls navigate('/quiz')", () => {
    render(<Home />);
    const btn = screen.getByRole("button", { name: /start quiz/i });
    fireEvent.click(btn);
    expect(mockedNavigate).toHaveBeenCalledWith("/quiz");
  });

  it("applies correct CSS class names", () => {
    render(<Home />);
    expect(screen.getByRole("heading").parentElement).toHaveClass("home-page");
    expect(screen.getByRole("button", { name: /start quiz/i })).toHaveClass(
      "start-quiz-btn"
    );
  });
});
