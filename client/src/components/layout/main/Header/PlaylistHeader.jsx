import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { Subititle } from "../../../common/Subtitle";

const ProfileImg = styled.div`
  overflow: hidden;
  display: flex;
  height: 232px;
  width: 232px;
  margin-right: 24px;
  box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  justify-content: center;
  > img {
    object-fit: cover;
  }
`;

const TextContent = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .Header-about-title {
    font-size: 0.75em;
    color: hsla(0, 0%, 100%, 0.7);
    letter-spacing: 1px;
  }
`;
const Container = styled.div`
  display: flex;
  padding-top: 40px;
`;

const Name = styled.h1`
  font-size: 5.2em;
  font-weight: 900;
  word-spacing: 8px;
  letter-spacing: -3px;
  ${({ scaleFont }) =>
    scaleFont &&
    `
  font-size: 2.6em;
  letter-spacing: 0;
  word-spacing: -3px;
  font-weight: 700;
  `}
`;
export const PlaylistHeader = ({ data }) => {
  let isShouldUpdate = useRef(false);
  const subtitles = [];
  const [nameHeight, setNameHeight] = useState(0);

  useEffect(() => {
    if (!isShouldUpdate.current) {
      setNameHeight(document.querySelector("#playlist-name").offsetHeight);
    }
  }, []);

  return (
    <Container>
      <ProfileImg>
        <img
          src={data.images[0].url}
          alt={data.name + "'s profile pic"}
          height="100%"
          width="auto"
          data-testid="playlist-cover-img"
        />
      </ProfileImg>
      <TextContent>
        <h2 className="Header-about-title">{data.type.toUpperCase()}</h2>
        <Name id="playlist-name" scaleFont={nameHeight > 124}>
          {data.name}
        </Name>
        <Subititle arrayOfText={[data.description]} />
        <Subititle arrayOfText={subtitles} />
      </TextContent>
    </Container>
  );
};
