import { render, screen } from "@testing-library/react";
import { ExampleComponent } from "./index";
import "@testing-library/jest-dom";

describe("ExampleComponent", () => {
  it("renders correctly", () => {
    render(<ExampleComponent />);

    expect(screen.getByRole("heading")).toHaveTextContent("Hello World");
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
