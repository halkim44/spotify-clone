import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { getTotalLengthOfTracks } from "../../../../utils/getTotalLengthOfTracks";
import { prettyMS } from "../../../../utils/prettyMS";
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
  .Header-display-name {
    font-size: 5.2em;
    font-weight: 900;
    word-spacing: 8px;
    letter-spacing: -3px;
  }
`;
const Container = styled.div`
  display: flex;
  padding-top: 40px;
`;

const ArtistName = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;
export const AlbumHeader = ({ data }) => {
  const subtitles = [];

  data.artists.forEach((artist) => {
    subtitles.push(
      <Link to={"/artist/" + artist.id}>
        <ArtistName>{artist.name}</ArtistName>
      </Link>
    );
  });

  const releaseYear = data.release_date.split("-")[0];
  let tracksInfo = "";

  tracksInfo +=
    data.total_tracks + " song" + (data.total_tracks > 1 ? "s" : "") + ", ";
  tracksInfo += prettyMS(getTotalLengthOfTracks(data.tracks.items), {});

  subtitles.push(releaseYear);
  subtitles.push(tracksInfo);
  return (
    <Container>
      <ProfileImg>
        <img
          src={data.images[0].url}
          alt={data.display_name + "'s profile pic"}
          height="100%"
          width="auto"
          data-testid="album-cover-img"
        />
      </ProfileImg>
      <TextContent>
        <h2 className="Header-about-title">{data.type.toUpperCase()}</h2>
        <h1 className="Header-display-name">{data.name}</h1>
        <Subititle arrayOfText={subtitles} />
      </TextContent>
    </Container>
  );
};
