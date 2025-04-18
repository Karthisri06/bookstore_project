import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";

vi.mock("../services/AuthContext", () => {
  return {
    useAuth: vi.fn(),
  };
});


import { useAuth } from "../services/AuthContext";

describe("Navbar", () => {
  it("renders BookStore brand", () => {
    (useAuth as any).mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
      openAuthModal: vi.fn(),
    });

    render(
      <Router>
        <Navbar />
      </Router>
    );

    const brand = screen.getByText("BookStore");
    expect(brand.textContent).toBe("BookStore");
  });

  it("shows Login / Sign Up when not authenticated", () => {
    (useAuth as any).mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
      openAuthModal: vi.fn(),
    });

    render(
      <Router>
        <Navbar />
      </Router>
    );

    const loginButton = screen.getByText("Login / Sign Up");
    expect(loginButton.textContent).toBe("Login / Sign Up");
  });

  it("shows Logout when authenticated", () => {
    (useAuth as any).mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn(),
      openAuthModal: vi.fn(),
    });

    render(
      <Router>
        <Navbar />
      </Router>
    );

    const logoutButton = screen.getByText("Logout");
    expect(logoutButton.textContent).toBe("Logout");
  });
});
