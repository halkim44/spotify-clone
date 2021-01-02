import { cleanup, render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { LeftContainer } from "../components/layout/left/LeftContainer";
import { userPlaylists } from "../test/fixtures/responseObj";
afterEach(cleanup);

jest.mock("../services/spotify/playlist");
//mock getCurrentUserPlaylist

test("should render left Content(sidebar)", async () => {
  render(<LeftContainer />, { wrapper: MemoryRouter });
  // test if logo is displayed
  await screen.findByText("Spotify");
  await screen.findByTestId("spotify-logo");
  // test if nav is rendered
  await screen.findByText("Home");
  await screen.findByText("Search");
  await screen.findByText("Your Library");

  // test if all user playlist is displayed
  const playlistsNav = await screen.findAllByTestId("playlist-side-nav-item");
  userPlaylists.data.items.forEach((playlist, i) => {
    const { getByText } = within(playlistsNav[i]);

    getByText(playlist.name);
  });
});
