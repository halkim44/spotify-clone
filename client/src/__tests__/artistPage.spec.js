import React from "react";
import {
  render,
  cleanup,
  screen,
  within,
  fireEvent,
} from "@testing-library/react";
import {
  artistAlbumsResObj,
  artistDataResObj as mockArtistsDataResObj,
  artistTopTracksResObj,
  relatedArtistsResObj,
} from "../test/fixtures/responseObj";
import { Artist } from "../pages/Artist";

import { MemoryRouter } from "react-router-dom";
import { appearsOnResObj } from "../test/fixtures/playlistResObj";

afterEach(cleanup);
jest
  .mock("../contexts/userData")

  // mock getArtist
  // mock getRelatedArtists
  // mock getArtistAlbums
  .mock("../services/spotify/artists");

test("should render all Artist data in artist page", async () => {
  render(<Artist />, { wrapper: MemoryRouter });

  // test loading page
  screen.getByTestId("loading-page");

  // test if artist name is displayed
  await screen.findByText(mockArtistsDataResObj.data.name);

  // test if popular song section is rendered
  await screen.findAllByText("Popular");

  const popularTracks = await screen.findAllByTestId(
    "popular-track-list-item-name"
  );
  popularTracks.forEach((trackListItem, i) => {
    const { getByText } = within(trackListItem);
    // test if popular list item is rendered
    getByText(artistTopTracksResObj.data.tracks[i].name);
  });

  // test that the popular section will render 5 listItem at first
  expect(popularTracks).toHaveLength(5);

  // click the see more button
  const seeMoreBtn = await screen.findByTestId("see-more-button");
  const { getByText } = within(seeMoreBtn);
  getByText("SEE MORE");

  fireEvent.click(seeMoreBtn);
  let newPopularTracks = await screen.findAllByTestId(
    "popular-track-list-item-name"
  );
  // the popular list doubles in length when user clicked the see more button
  expect(newPopularTracks).toHaveLength(10);
  getByText("SHOW LESS");

  // popular list back to 5 when clicking "show Less"
  fireEvent.click(seeMoreBtn);
  newPopularTracks = await screen.findAllByTestId(
    "popular-track-list-item-name"
  );
  expect(newPopularTracks).toHaveLength(5);

  // test discography section is rendered
  await screen.findByText("Discography");

  // get all discograhy <Card />
  const artistAlbums = await screen.findAllByTestId("discography-album-item");
  artistAlbums.forEach((albumCard, i) => {
    const { getByText } = within(albumCard);

    // test if each discography <Card /> is rendered
    getByText(artistAlbumsResObj.data.items[i].name);
  });

  // test "fans also like section" section is rendered
  await screen.findByText("Fans also like");
  const relatedArtists = await screen.findAllByTestId("related-artist-card");
  relatedArtists.forEach((relatedCard, i) => {
    const { getByText } = within(relatedCard);

    // test if each discography <Card /> is rendered
    getByText(relatedArtistsResObj.data.artists[i].name);
  });
  // test "Appears on" section is rendered
  await screen.findByText("Appears On");

  const appearsOnCards = await screen.findAllByTestId("appears-on-card");
  appearsOnCards.forEach((card, i) => {
    const { getByText } = within(card);

    // test if each discography <Card /> is rendered
    getByText(appearsOnResObj.data.items[i].name);
  });
});
