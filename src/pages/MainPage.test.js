import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { server } from "../components/mocks/server";
import { UserContext } from "../context/userContext";
import MainPage from "./MainPage";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe("Main Page", () => {
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
              }
        

         };
  });

  test("should render correctly", () => {
    customRender(
      <Router>
        <MainPage />
      </Router>,
      { providerProps }
    );
  });

  test("should display a sidebar", () => {
    customRender(
      <Router>
        <MainPage />
      </Router>,
      { providerProps }
    );

    const navigationElements = screen.getAllByRole("navigation");
    expect(navigationElements.length).toBeGreaterThan(1);
  });

 
});
