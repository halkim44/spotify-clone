import { cleanup, render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Playlist } from "../pages/Playlist";
import { playlistDataResObj } from "../test/fixtures/playlistResObj";

afterEach(cleanup);

// mock getPlaylist
jest.mock("../services/spotify/playlist");
// mock getPlaylistItems
//
test("should render all playlist data", async () => {
  render(<Playlist />, { wrapper: MemoryRouter });

  await screen.findByText(playlistDataResObj.data.name);
  await screen.findByText(playlistDataResObj.data.description);
  const tracks = await screen.findAllByTestId("playlist-track-list-item-name");

  playlistDataResObj.data.tracks.items.forEach((track, i) => {
    const { getByText } = within(tracks[i]);

    // test if track data is displayed
    getByText(track.track.name);
    getByText(track.track.artists[0].name);
    getByText(track.track.album.name);
  });
  // test if playlist cover image is displayed
  const playlistCoverImg = await screen.findByTestId("playlist-cover-img");
  expect(playlistCoverImg).toHaveAttribute(
    "src",
    playlistDataResObj.data.images[0].url
  );

  // test if description is displayed
  await screen.findByText(playlistDataResObj.data.description);
});
