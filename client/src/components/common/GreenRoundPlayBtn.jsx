import styled from "@emotion/styled";
import React from "react";
import { MdPlayArrow } from "react-icons/md";
import { play } from "../../services/spotify/player";

const Container = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #1db954;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.06);
  }
  > * {
    font-size: 0.68em;
  }
`;

export const GreenRoundPlayBtn = ({ uri }) => {
  return (
    <Container onClick={() => play(uri)}>
      {console.log(uri)}
      <MdPlayArrow />
    </Container>
  );
};
