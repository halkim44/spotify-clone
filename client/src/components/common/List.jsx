import React, { useState } from "react";
import styled from "@emotion/styled";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdPlayArrow } from "react-icons/md";
import { getMMSSfromMilisec } from "../../utils/spotifyHelper";
import { play } from "../../services/spotify/player";
import { Link } from "react-router-dom";
const ListSyled = styled.li`
  display: grid;
  grid-template-columns: 24px 4fr 2fr [last] minmax(110px, 1fr);
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
  .List-track-name {
    color: #fff;
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
`;

const AlbumImgWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  > img {
    width: 100%;
  }
`;
const AlbumName = styled.span`
  font-size: 0.875em;
  position: relative;
  z-index: 6;
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

export const List = ({ trackData, num, noAlbumInfo, clickFunction }) => {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <ListSyled
      key={num}
      onMouseEnter={() => setIsHovered(num)}
      onMouseLeave={() => setIsHovered(null)}
    >
      {!clickFunction ? (
        <ClickSpace onClick={() => play(null, [trackData.uri])} />
      ) : (
        <ClickSpace onClick={clickFunction} />
      )}
      <div className="List-track-num">
        {isHovered === num ? <MdPlayArrow /> : <span>{num + 1}</span>}
      </div>
      <div>
        {!noAlbumInfo && (
          <AlbumImgWrapper>
            <img
              src={trackData.album.images[2].url}
              alt={trackData.album.name}
            />
          </AlbumImgWrapper>
        )}

        <span className="List-track-name">{trackData.name}</span>
      </div>
      {!noAlbumInfo && (
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
