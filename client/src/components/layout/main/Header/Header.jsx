import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;

  .Header-content {
    display: flex;
    align-items: flex-end;
    padding: 34px;
    background-color: rgb(83, 83, 83);
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  }
`;

const BackgroundReflection = styled.div`
  height: 232px;
  width: 100%;
  position: absolute;
  background-color: rgb(83, 83, 83);
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), #121212);
  z-index: -1;
  top: 100%;
`;

export const Header = ({ about = "user", children }) => {
  return (
    <Container about={about}>
      <div className="Header-content">{children}</div>
      <BackgroundReflection />
    </Container>
  );
};
