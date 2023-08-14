import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import NavigationBar from "./Navbar";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe("NavigationBar", () => {
  let providerProps;

  beforeEach(() => {
    providerProps = {
      user: {
        "data": [
          {
            "_id": "64c8bf3c52c5fcb7df4c2ff6",
            "fname": "abc",
            "lname": "abc",
            "email": "abc",
            "username": "abc",
            "image": ""
          }
        ]
      },
    };
  });

  test("should display a sidebar", () => {
    customRender(
      <Router>
        <NavigationBar />
      </Router>,
      { providerProps }
    );

    const navigationElements = screen.getAllByRole("navigation");
    expect(navigationElements.length).toBeGreaterThan(1);
  });

  test("should navigate to different tabs when clicked", () => {
    const mockHandleTabClick = jest.fn();

    customRender(
      <Router>
        <NavigationBar activeTab="Home" handleTabClick={mockHandleTabClick} />
      </Router>,
      { providerProps }
    );

    const TeamsTab = screen.getByTestId("teams-main-nav-link");
    
   

   

    fireEvent.click(TeamsTab);
    expect(mockHandleTabClick).toHaveBeenCalledWith("Teams");

    
  });
});
