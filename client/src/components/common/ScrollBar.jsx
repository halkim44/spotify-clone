import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";

const Container = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: -${({ scrollbarWidth }) => scrollbarWidth}px;
  height: 100%;

  .track-vertical {
    top: 2px;
    bottom: 2px;
    right: 2px;
    border-radius: 3px;

    .thumb-vertical {
      background-color: hsla(0, 0%, 100%, 0.3);

      &:hover {
        background-color: hsla(0, 0%, 100%, 0.5);
      }
    }
  }
`;
export const ScrollBar = ({ children, onScrollCallback }) => {
  const renderThumb = ({ style, ...props }) => {
    const customStyle = {};
    return (
      <div
        {...props}
        style={{ ...style, ...customStyle }}
        className="thumb-vertical"
      />
    );
  };

  const renderTrack = ({ style, ...props }) => {
    const customStyle = {
      width: "12px",
    };
    return (
      <div
        {...props}
        style={{ ...style, ...customStyle }}
        className="track-vertical"
      />
    );
  };

  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const scrollContainer = useRef(null);

  useEffect(() => {
    if (scrollContainer.current) {
      setScrollbarWidth(
        scrollContainer.current.offsetWidth -
          scrollContainer.current.clientWidth
      );
    }
  }, []);
  return (
    <Container ref={scrollContainer} scrollbarWidth={scrollbarWidth}>
      <Scrollbars
        renderThumbVertical={renderThumb}
        renderTrackVertical={renderTrack}
        autoHide
        onScroll={onScrollCallback}
      >
        {children}
      </Scrollbars>
    </Container>
  );
};
