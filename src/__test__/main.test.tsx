import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

test("renders book store", () => {
  render(<App />);
  const linkElement = screen.getByText(/book store/i);
  expect(linkElement).toBeInTheDocument();
});
