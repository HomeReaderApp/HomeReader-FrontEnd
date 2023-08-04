import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TeacherPortal from "../pages/TeacherPortal";

test("should render Teacher Portal header", () => {
  render(<TeacherPortal />, { wrapper: MemoryRouter });
  expect(screen.getByText("Teacher Portal")).toBeInTheDocument();
});

// test("should render navigation buttons", () => {
//     render(<TeacherPortal />, { wrapper: MemoryRouter });
  
//     // Verify that the navigation buttons are rendered
//     expect(screen.getByRole("button", { name: /teacher classes/i })).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /comments/i })).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /favourite books/i })).toBeInTheDocument();
//   });

  