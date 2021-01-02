import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { User } from "../pages/User/User";
import { premiumAccountUser as mockUserData } from "../test/fixtures/userDataObj";

afterEach(cleanup);

// mock userdata context
jest
  .mock("../contexts/userData")
  // mock react router hooks
  .mock("react-router-dom", () => ({
    useParams: () => ({
      id: mockUserData.data.id,
    }),
    useRouteMatch: () => ({
      url: "/user/" + mockUserData.data.id,
    }),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
  }))
  // mock getCurrentUserFollowed
  .mock("../services/spotify/follow")
  // mock getCurrentPlaylists
  .mock("../services/spotify/playlist");

// mock getUserData

test("should render all user data", async () => {
  render(<User />);

  // make sure user profile pic is rendered
  const userProfileImg = await screen.findByTestId("user-page-profile-img");
  expect(userProfileImg).toHaveAttribute("src", "test-user-data-img-url");

  // make sure user name is rendered
  await screen.findByText(mockUserData.data.display_name);

  // user subtitle
  await screen.findByText("Public Playlists");

  // render public playlist section
  await screen.findByText("Public Playlists");

  // render followings sections
  await screen.findByText("Following");

  // make sure to display subtitles
  await screen.findByText("12 Followers");
  await screen.findByText("6 Public Playlists");
  await screen.findByText("8 Following");
});
