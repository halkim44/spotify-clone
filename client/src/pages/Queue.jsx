import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Contents } from "../components/layout/main/Contents";
import { SectionHeader } from "../components/common/SectionHeader";
import { getCurrentPlayback } from "../services/spotify/player";

const Container = styled.div`
  margin-top: 58px;
  h4 {
    color: #b3b3b3;
  }
`;

const Warning = styled.p`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
`;
export const Queue = () => {
  useEffect(() => {
    getCurrentPlayback().then((res) => console.log(res));
  }, []);
  return (
    <Container>
      <Contents>
        <SectionHeader title="Queue" />
        <div>
          {/* Now Playing */}
          <h4>Now Playing</h4>
        </div>
        <div>
          <h4>Next from:</h4>

          {/* Next */}
        </div>
        <Warning>
          <strong>Attention</strong>: Queue is not ready due to the spotify api
          limitations.
        </Warning>
      </Contents>
    </Container>
  );
};
