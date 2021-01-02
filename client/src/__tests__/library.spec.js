import React from "react";
import {
  cleanup,
  fireEvent,
  getByTestId,
  render,
  screen,
  within,
} from "@testing-library/react";
import { Library } from "../pages/Collections/Library";
import { MemoryRouter, Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  currentUserFollowedList,
  userPlaylists,
} from "../test/fixtures/responseObj";
import { userSavedAlbumResObj } from "../test/fixtures/albumsResObj";

afterEach(cleanup);
jest
  .mock("../services/spotify/follow")
  .mock("../services/spotify/playlist")
  .mock("../services/spotify/album");
test("should render user playlists library", async () => {
  // by default will render to playlists
  render(
    <MemoryRouter initialEntries={["/collection/playlists"]}>
      <Route path="/collection">
        <Library />
      </Route>
    </MemoryRouter>
  );

  // render loading screen while fetching data
  screen.getByTestId("loading-page");

  // render playlist data
  await screen.findByText("Playlists");
  const playlistCards = await screen.findAllByTestId("library-playlist-card");
  userPlaylists.data.items.forEach((playlist, i) => {
    const { getByText } = within(playlistCards[i]);
    getByText(playlist.name);
  });
});

test("should render user artists library", async () => {
  // by default will render to playlists
  render(
    <MemoryRouter initialEntries={["/collection/artists"]}>
      <Route path="/collection">
        <Library />
      </Route>
    </MemoryRouter>
  );

  // render loading screen while fetching data
  screen.getByTestId("loading-page");

  // render Artists header
  await screen.findByText("Artists");

  // render artist cards
  const artistCards = await screen.findAllByTestId("library-artist-card");
  currentUserFollowedList.data.artists.items.forEach((artist, i) => {
    const { getByText } = within(artistCards[i]);
    getByText(artist.name);
  });
});

test("should render albums library", async () => {
  // by default will render to playlists
  render(
    <MemoryRouter initialEntries={["/collection/albums"]}>
      <Route path="/collection">
        <Library />
      </Route>
    </MemoryRouter>
  );

  // render loading screen while fetching data
  screen.getByTestId("loading-page");

  // render Artists header
  await screen.findByText("Albums");

  // render artist cards
  const albumCards = await screen.findAllByTestId("library-album-card");
  userSavedAlbumResObj.data.items.forEach((album, i) => {
    const { getByText } = within(albumCards[i]);
    getByText(album.album.name);
  });
});
