import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Wrapper = styled.div`
  flex: 1;
  margin: 0 8px;
  padding: 6px 0;

  &:hover {
    .progress-bar {
      background-color: #1db954;
    }
  }
`;
const ProgressBarBg = styled.div`
  background-color: #535353;
  height: 4px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
`;
const ProgressBar = styled.div`
  background-color: #b3b3b3;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 50px;
  ${({ progress }) => `width: ${progress}%`}
`;

export const Slider = ({ progress, endCallback, dragCalback, testId }) => {
  const [sliderState, setSliderState] = useState({ progress });

  const isDrag = useRef(false);
  const seekValue = useRef(progress || 0);
  const currentElement = useRef();
  useEffect(() => {
    setSliderState({ progress });
  }, [progress]);

  const dragStartHandler = useCallback((e) => {
    if (isDrag.current) {
      seekValue.current = Math.floor(
        ((e.pageX - currentElement.current.offsetLeft) /
          currentElement.current.offsetWidth) *
          100
      );
      if (seekValue.current > 100) {
        seekValue.current = 100;
      }
      if (seekValue.current < 0) {
        seekValue.current = 0;
      }

      dragCalback && dragCalback(seekValue.current);

      setSliderState({ progress: seekValue.current });
    }
  }, []);

  const dragEndHandler = useCallback(
    (e) => {
      if (isDrag.current) {
        endCallback(seekValue.current);
        setSliderState({ progress: seekValue.current });
      }
      isDrag.current = false;
      document.removeEventListener("mousemove", dragStartHandler, false);
    },
    [dragStartHandler, endCallback]
  );

  // useEffect(() => {
  // }, [dragEndHandler]);

  return (
    <Wrapper
      onMouseDown={(e) => {
        isDrag.current = true;
        dragStartHandler(e);
        document.addEventListener("mouseup", dragEndHandler, true);
        document.addEventListener("mousemove", dragStartHandler, false);
      }}
      ref={currentElement}
      data-testid={testId}
    >
      <ProgressBarBg>
        <ProgressBar progress={sliderState.progress} className="progress-bar" />
      </ProgressBarBg>
    </Wrapper>
  );
};
