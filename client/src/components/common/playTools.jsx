import styled from "@emotion/styled";
import React from "react";
import { FollowBtn } from "./FollowBtn";
import { GreenRoundPlayBtn } from "./GreenRoundPlayBtn";

const Container = styled.div`
  height: 84px;
  display: flex;
  align-items: center;

  > button:first-of-type {
    margin-right: 24px;
  }
`;
const PlayBtnWrapper = styled.div`
  margin-right: 32px;

  > * {
    font-size: 64px;
  }
`;

export const PlayTools = ({ uri, showFollow }) => {
  return (
    <Container>
      <PlayBtnWrapper>
        <GreenRoundPlayBtn uri={uri} />
      </PlayBtnWrapper>
      {showFollow && <FollowBtn />}
    </Container>
  );
};
