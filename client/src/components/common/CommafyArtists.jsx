import { Link } from "react-router-dom";
import React from "react";
import { getIdFromUri } from "../../utils/spotifyHelper";
import styled from "@emotion/styled";

const ArtistName = styled.span`
  font-weight: 400;
  color: #b3b3b3;
  line-height: 0.7em;
  &:hover {
    text-decoration: underline;
  }
`;

export const CommafyArtist = ({ artistArray }) => {
  return (
    <>
      {artistArray.map((artist, i) => (
        <Link to={"/artist/" + getIdFromUri(artist.uri)} key={i}>
          {i > 0 && <span>, </span>}
          <ArtistName>{artist.name}</ArtistName>
        </Link>
      ))}
    </>
  );
};
