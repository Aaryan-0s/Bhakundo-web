import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios"; // Mocked axios instance
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { server } from "../mocks/server"; // Import your MSW server
import DashboardBody from "./DashboardBody";

// Set up Axios mock
jest.mock("axios");

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe("DashboardBody", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  let providerProps;

  beforeEach(() => {
    providerProps = {
      setUser: jest.fn(),
      isLoading: false,
      setIsLoading: jest.fn(),
    };
  });

  test("updates user profile on form submission", async () => {
    // Mock user context
    const mockUser = {
      data: [
        {
            fname: "abc",
            lname: "abc",
            email: "abc",
            username: "abc",
            image: "",
            
        },
      ],
    };

    // Mock Axios response
    axios.put.mockResolvedValueOnce({ data: mockUser });

    // Render the component
    customRender(
      <Router>
        <DashboardBody />
      </Router>,
      { providerProps }
    );

    // Fill out the form
    fireEvent.change(screen.getByTestId("fname"), {
      target: { value: "Updated Name" },
    });
    // ... Simulate changes for other fields ...

    // Submit the form
    fireEvent.click(screen.getByText("Update"));

    // Wait for the update to complete
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
    });

    // Check that the user context was updated
    expect(screen.getByTestId("fname")).toHaveValue("Updated Name");
  });
});