import React from "react";
import { render, cleanup, screen, within } from "@testing-library/react";
import { Album } from "../pages/Album";
import {
  albumResObj as mockAlbumResObj,
  artistAlbumsResObj,
} from "../test/fixtures/responseObj";

afterEach(cleanup);

const albumTrackTimes = [
  "1:08",
  "6:05",
  "5:54",
  "5:54",
  "4:52",
  "2:14",
  "6:55",
  "6:16",
  "4:40",
  "6:21",
  "6:16",
  "5:37",
];

jest
  .mock("react-router-dom", () => ({
    useParams: () => ({
      id: mockAlbumResObj.data.id,
    }),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
  }))
  // mock getAlbum
  .mock("../services/spotify/artists")
  .mock("../services/spotify/album");

// mock getArtistAlbum

test("should render album data", async () => {
  render(<Album />);

  // make sure album cover is displayed
  const userProfileImg = await screen.findByTestId("album-cover-img");
  expect(userProfileImg).toHaveAttribute(
    "src",
    mockAlbumResObj.data.images[0].url
  );

  // make sure album name is displayed
  await screen.findByText(mockAlbumResObj.data.name);
  const tracks = await screen.findAllByTestId("album-track");

  // make sure all track is displayed
  tracks.forEach((track, i) => {
    const { getByText } = within(track);
    getByText(mockAlbumResObj.data.tracks.items[i].name);
    getByText(albumTrackTimes[i]);
  });

  // make sure "more by [artistName]" is displayed
  await screen.findByText("More by " + mockAlbumResObj.data.artists[0].name);

  // make sure to render other album by the same artist
  const otherAlbums = await screen.findAllByTestId("more-by-album");

  otherAlbums.forEach((albumCard, i) => {
    const { getByText, getByAltText } = within(albumCard);

    // make sure more by albums' name is rendered
    getByText(artistAlbumsResObj.data.items[i].name);

    const releaseYear = artistAlbumsResObj.data.items[i].release_date.split(
      "-"
    )[0];
    // test if album year is rendered
    getByText(releaseYear);

    // make sure more by album cover is rendered
    expect(getByAltText(artistAlbumsResObj.data.items[i].name)).toHaveAttribute(
      "src",
      artistAlbumsResObj.data.items[i].images[0].url
    );
  });
});

// make sure the subtitle is displayed
// test if copyright is displayed
