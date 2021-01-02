import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Slider } from "../../components/common/Slider";

afterEach(cleanup);

test("should render <Slider />", () => {
  const endCallbackMock = jest.fn();
  const dragCallbackMock = jest.fn();

  render(
    <Slider
      progress="0"
      endCallback={endCallbackMock}
      dragCalback={dragCallbackMock}
      testId="slider-unit-test"
    />
  );

  const sliderBar = screen.getByTestId("slider-unit-test");

  // test start dragging/mousedown on the slider
  fireEvent.mouseDown(sliderBar);
  expect(dragCallbackMock).toHaveBeenCalledTimes(1);
  expect(endCallbackMock).toHaveBeenCalledTimes(0);
  // test when user is dragging the slider
  fireEvent.mouseMove(sliderBar);
  expect(dragCallbackMock).toHaveBeenCalledTimes(2);
  expect(endCallbackMock).toHaveBeenCalledTimes(0);

  // test when user end dragging and mouse up
  fireEvent.mouseUp(sliderBar);
  expect(dragCallbackMock).toHaveBeenCalledTimes(2);
  expect(endCallbackMock).toHaveBeenCalledTimes(1);
});
