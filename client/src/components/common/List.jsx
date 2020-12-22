import React, { useState } from "react";
import styled from "@emotion/styled";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdPlayArrow } from "react-icons/md";
import { getMMSSfromMilisec } from "../../utils/spotifyHelper";
import { play } from "../../services/spotify/player";
import { Link } from "react-router-dom";
import { CommafyArtist } from "./CommafyArtists";
const ListSyled = styled.li`
  display: grid;
  grid-template-columns: 24px [main]4fr 2fr [last] minmax(110px, 1fr);

  grid-gap: 16px;
  height: 54px;
  border-radius: 4px;
  padding: 0 24px;
  position: relative;
  * {
    color: #b3b3b3;
  }
  > *:last-of-type {
    justify-content: flex-end;
  }
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
    * {
      color: #fff !important;
    }
  }
  > * {
    display: flex;
    align-items: center;
  }
  .List-track-num {
    display: flex;
    text-align: center;
    justify-content: center;
    svg {
      width: 24px;
      height: 24px;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  ${({ isMini }) =>
    isMini &&
    `
  grid-template-columns: [main] 4fr [last] minmax(110px, 1fr);
  padding: 0 6px;
  `}
`;

const AlbumImgWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  position: relative;
  > img {
    width: 100%;
  }
  .List-play-icon-album-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const AlbumName = styled.span`
  font-size: 0.875em;
  position: relative;
  z-index: 6;
`;
const MainInfo = styled.div`
  grid-column: main;

  .List-track-name {
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const LastItem = styled.div`
  grid-column: last;
`;
const ClickSpace = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;
const ArtistsContainer = styled.div`
  font-size: 0.8em;
  position: relative;
  z-index: 5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const List = ({
  trackData,
  num = null,
  noAlbumInfo,
  clickFunction,
  isMini, // when we need less item to show on the list
  showArtist,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ListSyled
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isMini={isMini}
    >
      {!clickFunction ? (
        <ClickSpace onClick={() => play(null, [trackData.uri])} />
      ) : (
        <ClickSpace onClick={clickFunction} />
      )}
      {!isMini && (
        <div className="List-track-num">
          {isHovered ? <MdPlayArrow /> : <span>{num + 1}</span>}
        </div>
      )}
      <MainInfo>
        {!noAlbumInfo && (
          <AlbumImgWrapper>
            <img
              src={trackData.album.images[2].url}
              alt={trackData.album.name}
            />
            {isHovered && isMini && (
              <div className="List-play-icon-album-cover">
                <MdPlayArrow />
              </div>
            )}
          </AlbumImgWrapper>
        )}
        <div>
          <span className="List-track-name">{trackData.name}</span>
          {(isMini || showArtist) && (
            <ArtistsContainer>
              <CommafyArtist artistArray={trackData.artists} />
            </ArtistsContainer>
          )}
        </div>
      </MainInfo>
      {!noAlbumInfo && !isMini && (
        <div>
          <AlbumName>
            <Link to={"/album/" + trackData.album.id}>
              {trackData.album.name}
            </Link>
          </AlbumName>
        </div>
      )}
      {/* <Coki>{trackData.name}</Coki> */}
      {/* <Poki>{trackData.name}</Poki> */}
      <LastItem>{getMMSSfromMilisec(trackData.duration_ms)}</LastItem>
    </ListSyled>
  );
};
