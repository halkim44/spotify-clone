import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { UserDropDown } from "../components/UserDropdown";

beforeEach(cleanup);

jest
  .mock("../context", () => ({
    useUserDataState: () => ({
      data: { display_name: "Halkim Rajan", images: [{ url: "test-img.jpg" }] },
    }),
  }))
  .mock("../components/OverlayMenu", () => ({
    OverlayMenu: () => <div></div>,
  }));

describe("UserDropdown", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("renders list when clicked", () => {
    it("should not render list at first", () => {
      let { queryByTestId } = render(<UserDropDown />);
      expect(queryByTestId("dd-list")).toBeFalsy();
    });
    it("should render dropdown list when clicked once", () => {
      let { queryByTestId } = render(<UserDropDown />);
      fireEvent.click(queryByTestId("dropdown-pill"));
      expect(queryByTestId("dd-list")).toBeTruthy();
    });

    it("should not render list when clicked twice", () => {
      let { queryByTestId } = render(<UserDropDown />);
      fireEvent.click(queryByTestId("dropdown-pill"));
      fireEvent.click(queryByTestId("dropdown-pill"));
      expect(queryByTestId("dd-list")).toBeFalsy();
    });
  });
});
