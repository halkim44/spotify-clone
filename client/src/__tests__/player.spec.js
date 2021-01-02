import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { BottomContainer } from "../components/layout/bottom/BottomContainer";
import { setPlayerVolume } from "../services/spotify/player";
jest.mock("../services/spotify/SDKInitializer").mock("../contexts/userData");

afterEach(cleanup);

jest.mock("../services/spotify/player");
test("should render music player", () => {
  render(<BottomContainer />, { wrapper: MemoryRouter });

  screen.getByLabelText("shuffle");
  screen.getByLabelText("play");
  screen.getByLabelText("previous");
  screen.getByLabelText("next");
  screen.getByLabelText("repeat");
  screen.getByLabelText("queue");
  const muteToggler = screen.getByLabelText("mute toggle");

  // test mute
  fireEvent.click(muteToggler);
  screen.getByTestId("mute-icon");
  expect(setPlayerVolume).toHaveBeenCalledTimes(2); // because the first one is during the initializing phase
  fireEvent.click(muteToggler);
  expect(setPlayerVolume).toHaveBeenCalledTimes(3);
});
