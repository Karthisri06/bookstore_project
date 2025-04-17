import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the AuthContext for different cases
vi.mock("../services/AuthContext", () => {
  return {
    useAuth: vi.fn(() => ({
      isAuthenticated: false,
      logout: vi.fn(),
    })),
  };
});

describe("Navbar", () => {
  it("renders BookStore brand", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const brand = screen.getByText("BookStore");
    expect(brand.textContent).toBe("BookStore"); // no jest-dom needed
  });

  it("shows Login / Sign Up when not authenticated", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const loginButton = screen.getByText("Login / Sign Up");
    expect(loginButton.textContent).toBe("Login / Sign Up");
  });

  it("shows Logout when authenticated", () => {
    const mockedUseAuth = require("../services/AuthContext").useAuth;
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      openAuthModal: vi.fn(),
      logout: vi.fn(),
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

