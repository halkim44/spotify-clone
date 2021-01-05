import styled from "@emotion/styled";
import React from "react";
import { PlaceHolderImg } from "../../../common/PlaceHolderImg";

const ProfileImg = styled.div`
  overflow: hidden;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  > * {
    position: absolute;
    top: -70%;
    width: 100%;
    height: auto;
    z-index: 1;
  }
  &::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.26);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
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
  .Header-display-name {
    font-size: 5.2em;
    font-weight: 900;
    word-spacing: 8px;
    letter-spacing: -3px;
  }
`;
const Container = styled.div`
  display: flex;
  padding-top: 172px;
`;
export const ArtistHeader = ({ data }) => {
  return (
    <Container>
      <ProfileImg>
        {!data.images.length ? (
          <PlaceHolderImg type={data.type} />
        ) : (
          <img src={data.images[0].url} alt={data.name} height="100%" />
        )}
      </ProfileImg>
      <TextContent>
        <h2 className="Header-about-title">
          {data.type === "user" ? "PROFILE" : data.type.toUpperCase()}
        </h2>
        <h1 className="Header-display-name">{data.name}</h1>
      </TextContent>
    </Container>
  );
};
