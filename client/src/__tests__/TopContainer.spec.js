import React from "react";
import { render, cleanup } from "@testing-library/react";
import { TopContainer } from "../components/TopContainer";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useUserDataState: () => ({
    data: { display_name: "Halkim Rajan", images: [{ url: "test-img.jpg" }] },
  }),
}));

describe("<TopContainer />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("anonymous user", () => {
    it("renders login button", () => {
      const { queryByText } = render(<TopContainer />);
      expect(queryByText("LOG IN")).toBeTruthy();
    });
  });

  it("renders back and forward button", () => {
    const { queryByTestId } = render(<TopContainer />);
    expect(queryByTestId("forward-btn")).toBeTruthy();
    expect(queryByTestId("back-btn")).toBeTruthy();
  });

  describe("authenticated user", () => {
    it("renders user Info", () => {
      const { queryByText } = render(<TopContainer isUserAuthenticated />);
      expect(queryByText("Halkim Rajan")).toBeTruthy();
    });
  });
});
