import { render, screen } from "@testing-library/react";
import React from "react";
import Sidebar from "./SideNaveBar";



import { waitFor } from "@testing-library/react";

import { server } from "../../components/mocks/server"; // Adjust the path based on your file structure

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Sidebar Component", () => {
  test("renders team standings from API", async () => {
    render(<Sidebar isOpen={true} handleTabClick={() => {}} />);

    // Wait for the team standings to be fetched and rendered
    await waitFor(() => {
    //   const teamStandings = screen.getByTestId("team-standings");
    //   expect(teamStandings).toBeInTheDocument();

      // Check if the team standings data is correctly rendered
      const teamName = screen.getByText("Vissel Kobe");
     
    //   const teamGoalsDiff = screen.getByText("Goals Diff: 25");

      expect(teamName).toBeInTheDocument();
      
    });
  });

  // Add more tests for other interactions and scenarios
});
