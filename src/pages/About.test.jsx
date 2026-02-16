import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import About from "./About";

describe("About", () => {
  it("renders the heading 'About ScriptSense'", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /About ScriptSense/i })
    ).toBeInTheDocument();
  });

  it("renders the 'What Worked Well' section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /What Worked Well/i })
    ).toBeInTheDocument();
  });

  it("renders the 'What Didn't Work Well' section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: /What Didn't Work Well/i })
    ).toBeInTheDocument();
  });

  it("renders list items for What Worked Well section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText(/Rapid prototyping:/i)).toBeInTheDocument();
    expect(screen.getByText(/Context-aware suggestions:/i)).toBeInTheDocument();
    expect(screen.getByText(/Error reduction:/i)).toBeInTheDocument();
  });

  it("renders list items for What Didn't Work Well section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText(/Complex logic:/i)).toBeInTheDocument();
    expect(screen.getByText(/Design consistency:/i)).toBeInTheDocument();
    expect(screen.getByText(/Documentation and comments:/i)).toBeInTheDocument();
  });

  it("applies the correct CSS class to the page container", () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(container.querySelector(".about-page")).toBeInTheDocument();
  });
});
