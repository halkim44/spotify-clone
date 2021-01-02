import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { TopContainer } from "../components/layout/top/TopContainer";
import { createMemoryHistory } from "history";
import { premiumAccountUser } from "../test/fixtures/userDataObj";

test("should render top content", () => {
  render(<TopContainer />, { wrapper: MemoryRouter });

  // test if back and forward button is displayed
  screen.getByTestId("back-btn");
  screen.getByTestId("forward-btn");
  // test if login button is displayed
  screen.getByText("LOG IN");
});

test("should render library nav", () => {
  render(
    <MemoryRouter initialEntries={["/collections"]}>
      <TopContainer />
    </MemoryRouter>
  );

  screen.getByText("Playlists");
  screen.getByText("Artists");
  screen.getByText("Albums");

  expect(
    screen.queryByPlaceholderText("Search for Artists, songs or Playlists")
  ).toBeNull();

  // test if back and forward button is displayed
  screen.getByTestId("back-btn");
  screen.getByTestId("forward-btn");
  // test if login button is displayed
  screen.getByText("LOG IN");
});

test("should render search input", () => {
  const history = createMemoryHistory();
  history.push("/search/");
  const { debug } = render(
    <Router history={history}>
      <TopContainer />
    </Router>
  );

  // test if search input was rendered
  screen.getByPlaceholderText("Search for Artists, songs or Playlists");

  // make sure that library nav is not rendered
  expect(screen.queryByText("Playlists")).toBeNull();
  expect(screen.queryByText("Artists")).toBeNull();
  expect(screen.queryByText("Albums")).toBeNull();

  // test if back and forward button is displayed
  screen.getByTestId("back-btn");
  screen.getByTestId("forward-btn");
  // test if login button is displayed
  screen.getByText("LOG IN");
});
jest.mock("../contexts/userData");
test("should render user menu", () => {
  render(<TopContainer isUserAuthenticated />, { wrapper: MemoryRouter });

  // test if back and forward button is displayed
  screen.getByTestId("back-btn");
  screen.getByTestId("forward-btn");

  // login button is no longer display
  expect(screen.queryByText("LOG IN")).toBeNull();

  const userPillMenu = screen.getByText(premiumAccountUser.data.display_name);

  // test userPill event
  expect(screen.queryByText("Log out")).toBeNull();
  expect(screen.queryByText("Profile")).toBeNull();
  fireEvent.click(userPillMenu);
  screen.getByText("Profile");
  screen.getByText("Log out");
});
