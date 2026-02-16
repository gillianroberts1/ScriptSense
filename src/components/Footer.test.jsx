import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the copyright year", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} ScriptSense`))).toBeInTheDocument();
  });

  it("renders 'Built with AI' text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Built with AI/i)).toBeInTheDocument();
  });

  it("renders 'Designed by CodeCarmenCita' text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Designed by CodeCarmenCita/i)).toBeInTheDocument();
  });

  it("renders the GitHub link", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const githubLink = screen.getByRole("link", { name: /GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/gillianroberts1/ScriptSense");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the About link", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const aboutLink = screen.getByRole("link", { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("renders the version number", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/v1.0.0/)).toBeInTheDocument();
  });

  it("applies the correct CSS classes to the footer container", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(container.querySelector(".app-footer")).toBeInTheDocument();
    expect(container.querySelector(".footer-content")).toBeInTheDocument();
  });
});
