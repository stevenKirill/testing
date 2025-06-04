import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./index";
import AuthService from "../../lib/services/AuthService";
import { jest } from "@jest/globals";

jest.mock("../../lib/services/AuthService");

// В React Testing Library есть три основных метода поиска элементов:
// getBy... - синхронный поиск, ошибка если элемент не найден
// queryBy... - синхронный поиск, возвращает null если элемент не найден
// findBy... - асинхронный поиск, ждёт появления элемента

describe("LoginForm Integration Test", () => {
  // кейс ошибки
  it("shows error message when login fails", async () => {
    (AuthService.login as jest.MockedFunction<typeof AuthService.login>).mockRejectedValue(new Error("Auth failed"));

    render(<LoginForm />);

    // Заполняем форму неверными данными
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrong" },
    });

    // Отправляем форму
    fireEvent.click(screen.getByText("Login"));

    // Ждём появления ошибки
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Invalid email or password");
  });

  // кейс успешного логина
  it("shows success message when login succeeds", async () => {
    (
      AuthService.login as jest.MockedFunction<typeof AuthService.login>
    ).mockResolvedValue({ success: true });

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Login"));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Login successful");
  });
});
