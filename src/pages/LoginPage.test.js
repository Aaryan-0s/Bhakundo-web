
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { server } from "../components/mocks/server";
import { UserContext } from "../context/userContext";
import LoginPage from "./LoginPage";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe("Signup Page", () => {
  let providerProps;

  beforeAll(() => {
    server.listen(); // Start the test server
  });

  afterEach(() => {
    server.resetHandlers(); // Reset any runtime request handlers between tests
  });

  afterAll(() => {
    server.close(); // Close the test server after all tests are done
  });

  beforeEach(() => {
    providerProps = {
      isLoading: false,
      setIsLoading: jest.fn(),
    };
  });

  



  test("should login a user when the form is submitted with valid data", async () => {
    customRender(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
      { providerProps }
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "testuser3@example.com" },
    });

   

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "testpassword" },
    });

    const createAccountButton = screen.getByRole("button", {
      name: /LOGIN/i,
    });

    fireEvent.click(createAccountButton);

    // Check if the success message is displayed
    await waitFor(() => {;
      expect(window.location.href).toBe("http://localhost/");
    });
  });
});
