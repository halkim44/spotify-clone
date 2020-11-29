import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { CommafyArtist } from "./CommafyArtists";
import { GreenRoundPlayBtn } from "./GreenRoundPlayBtn";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { PlaceHolderImg } from "./PlaceHolderImg";

const Container = styled.div`
  padding: 16px;
  background: #181818;
  height: 284px;
  position: relative;
  transition: background-color 0.3s ease;
  border-radius: 4px;
  &:hover {
    background-color: #282828;
  }
  &:hover {
    .play-button-hover {
      bottom: 8px;
      opacity: 1;
    }
  }
`;
const ImgContainer = styled.div`
  width: 100%;
  position: relative;
  border-radius: 4px;
`;
const ImgPlaceholder = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
`;
const ImgWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);

  ${({ isArtist }) =>
    isArtist === "artist" &&
    `
border-radius: 100%;
overflow: hidden;
`}
  > * {
    width: 100%;
  }
`;
const TextContent = styled.div`
  margin-top: 16px;
`;

const Name = styled.h4`
  font-size: 0.94em;
  width: 150px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;
const Subtitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 17px !important;
  font-weight: 400;

  * {
    font-size: 13px;
    font-weight: 400;
    color: #b3b3b3;
    white-space: normal;
  }
  a {
    position: relative;
    z-index: 4;
  }
`;

const PlayBtnWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 8px;
  z-index: 4;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  opacity: 0;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  > * {
    font-size: 40px;
  }
`;
const LinkWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  a {
    z-index: 3;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;
export const Card = ({ data, hideSubs }) => {
  const capitalize = (str) =>
    str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  const { type, owner } = data;

  let subText = "";
  switch (type) {
    case "playlist":
      if (!!data.description.length) {
        subText = data.description;
      } else {
        subText = "By " + owner.display_name;
      }
      break;
    default: {
      subText = capitalize(type);
    }
  }
  return (
    <Container>
      <LinkWrapper>
        <Link to={`/${type}/${data.id}`} />
      </LinkWrapper>

      <ImgContainer>
        <ImgPlaceholder />
        <ImgWrapper isArtist={type}>
          {!data.images.length ? (
            <PlaceHolderImg type={data.type} />
          ) : (
            <img src={data.images[0].url} alt={data.name} />
          )}
        </ImgWrapper>
        <PlayBtnWrapper className="play-button-hover">
          <GreenRoundPlayBtn uri={data.uri} />
        </PlayBtnWrapper>
      </ImgContainer>

      <TextContent>
        <Name>{data.name}</Name>
        <Subtitle>
          {type === "album" ? (
            <CommafyArtist artistArray={data.artists} />
          ) : (
            !hideSubs && <span>{subText}</span>
          )}
        </Subtitle>
      </TextContent>
    </Container>
  );
};