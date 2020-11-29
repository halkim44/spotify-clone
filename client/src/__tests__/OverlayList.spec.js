import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { OverlayMenu } from "../components/OverlayMenu";
import { MemoryRouter } from "react-router-dom";

beforeEach(cleanup);

describe("<OverlayMenu />", () => {
  const testData = [
    { name: "home", exec: jest.fn() },
    {
      name: "about",
      exec: jest.fn(),
    },
  ];
  it("should render the names of each data in a list", () => {
    const { getByText } = render(
      <MemoryRouter>
        <OverlayMenu list={testData} />
      </MemoryRouter>
    );

    testData.forEach(({ name }) => {
      expect(getByText(name)).toBeTruthy();
    });
  });
  it("should render exec when clicked", () => {
    const { getByText } = render(
      <MemoryRouter>
        <OverlayMenu list={testData} />
      </MemoryRouter>
    );

    testData.forEach(({ name }, i) => {
      fireEvent.click(getByText(name));
      expect(testData[i].exec.mock.calls.length).toEqual(1);
    });
  });
});
