import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { server } from "../mocks/server"; // Adjust the import path
import Favourite from "./Favourite";

// Configure the MSW server to handle API requests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("fav teamsComponent", () => {
  test("renders favorite teams", async () => {
    render(<Favourite handleTabClick={() => {}}/>);
    fireEvent.click(screen.getByText("Players"));
    // Wait for the data to be loaded
    await screen.findByText("abc");

    // Assert that the favorite team is rendered
    expect(screen.getByText("abc")).toBeInTheDocument();

    // // Simulate clicking the "Remove from Favorites" button
    fireEvent.click(screen.getByTestId("teams-starts"));

    // // Wait for the confirmation dialog to appear
    await screen.findByText("Are you sure?");

    // // Simulate clicking the "No" button in the confirmation dialog
    fireEvent.click(screen.getByText("No"));

    // // Wait for the confirmation dialog to disappear
    await waitFor(() => !screen.queryByText("Are you sure?"));

    // // // Assert that the favorite team is removed
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });
});
