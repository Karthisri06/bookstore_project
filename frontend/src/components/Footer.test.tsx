import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer text", () => {
    render(<Footer />);
   
    const footerText = screen.getByText(/© 2025 Online Bookstore/i); 
    expect(footerText.textContent).toContain("© 2025 Online Bookstore");
  });

  it("has correct styles", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo"); // assuming it's wrapped in <footer>

   
    expect(footerElement).not.toBeNull();

 
    expect(footerElement).toHaveStyle("background: rgb(245, 245, 245)");
  });
});
