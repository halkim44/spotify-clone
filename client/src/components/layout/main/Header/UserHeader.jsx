import styled from "@emotion/styled";
import React from "react";
import { Subititle } from "../../../common/Subtitle";

const ProfileImg = styled.div`
  overflow: hidden;
  display: flex;
  height: 232px;
  width: 232px;
  border-radius: 100%;
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
export const UserHeader = ({ data }) => {
  const subtitles = [];

  if (!!data.playlists.total) {
    subtitles.push(
      data.playlists.total +
        " Public Playlist" +
        (data.playlists.total > 1 ? "s" : "")
    );
  }

  if (!!data.followers.total) {
    subtitles.push(
      data.followers.total + " Follower" + (data.playlists.total > 1 ? "s" : "")
    );
  }

  if (!!data.following.total) {
    subtitles.push(data.playlists.total + " Following");
  }
  return (
    <Container>
      <ProfileImg>
        <img
          src={data.images[0].url}
          alt={data.display_name + "'s profile pic"}
          height="100%"
          width="auto"
        />
      </ProfileImg>
      <TextContent>
        <h2 className="Header-about-title">
          {data.type === "user" ? "PROFILE" : data.type.toUpperCase()}
        </h2>
        <h1 className="Header-display-name">{data.display_name}</h1>
        <Subititle arrayOfText={subtitles} />
      </TextContent>
    </Container>
  );
};
