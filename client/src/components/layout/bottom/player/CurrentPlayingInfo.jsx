import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

import { getIdFromUri } from "../../../../utils/spotifyHelper";
import { CommafyArtist } from "../../../common/CommafyArtists";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  margin: 0 14px;
  span {
    line-height: 0.75em;
    font-weight: 400;
    font-size: 0.875em;
    &:hover {
    }
  }
  > *:last-of-type {
    span {
      font-size: 0.8em;
    }
  }
  a:hover {
    span {
      color: #fff;
    }
  }
`;

const ImgContainer = styled.div`
  width: 56px;
  height: 56px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const NameContainer = styled.div``;

export const CurrentPlayingInfo = ({ album, trackName, artists }) => {
  return (
    <Container>
      <ImgContainer>
        <img src={album.images[1].url} alt="" />
      </ImgContainer>
      <Info>
        <NameContainer>
          <Link to={"/album/" + getIdFromUri(album.uri)}>
            <span>{trackName}</span>
          </Link>
        </NameContainer>
        <div>
          <CommafyArtist artistArray={artists} />
        </div>
      </Info>
    </Container>
  );
};
