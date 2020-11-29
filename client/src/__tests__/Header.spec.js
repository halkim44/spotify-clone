import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Header } from "../components/Header";

beforeEach(cleanup);

describe("<Header />", () => {
  const testData = [
    {
      displayName: "Halkim Rajan",
      imageUrl: "img.jpg",
      followingTotal: 35,
      followerTotal: 142,
      playlistTotal: 1,
    },
  ];
  it("should render displayName", () => {
    const { getByText } = render(<Header {...testData[0]} />);

    expect(getByText(testData[0].displayName)).toBeTruthy();
  });
  it("should render image", () => {
    const { getByAltText } = render(<Header {...testData[0]} />);

    expect(
      getByAltText(testData[0].displayName + "'s profile pic")
    ).toHaveAttribute("src", testData[0].imageUrl);
  });
  it("should render all total", () => {
    const { getByText, debug } = render(<Header {...testData[0]} />);

    debug();

    expect(getByText(testData[0].followingTotal + " Following")).toBeTruthy();
    expect(getByText(testData[0].followerTotal + " Followers")).toBeTruthy();
    expect(
      getByText(testData[0].playlistTotal + " Public Playlist")
    ).toBeTruthy();
  });
});
