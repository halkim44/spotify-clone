import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;

  .Header-content {
    display: flex;
    align-items: flex-end;
    padding: 34px;
    background-color: rgb(83, 83, 83);
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  }
`;

const BackgroundReflection = styled.div`
  height: 232px;
  width: 100%;
  position: absolute;
  background-color: rgb(83, 83, 83);
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), #121212);
  z-index: -1;
  top: 100%;
`;

export const Header = ({
  displayName,
  imageUrl,
  followingTotal,
  followerTotal,
  playlistTotal,
  about = "user",
  children,
}) => {
  return (
    <Container about={about}>
      <div className="Header-content">
        {children}
        {/*         
        <div className="Header-img-wrapper">
          <img
            src={imageUrl}
            alt={displayName + "'s profile pic"}
            height="100%"
            width="auto"
          />
        </div>
        <div className="Header-header-text-content">
          <h2 className="Header-about-title">
            {about === "user" ? "PROFILE" : about.toUpperCase()}
          </h2>
          <h1 className="Header-display-name">{displayName}</h1>

          {(followingTotal || followerTotal || playlistTotal) && (
            <p className="Header-subtitle">
              {!!playlistTotal && (
                <span>
                  {playlistTotal + " Public Playlist"}
                  {playlistTotal > 1 && "s"}
                </span>
              )}
              {!!followerTotal && (
                <span>
                  {followerTotal + " Follower"}
                  {followerTotal > 1 && "s"}
                </span>
              )}
              {followingTotal && <span>{followingTotal + " Following"}</span>}
            </p>
          )}
        </div> */}
      </div>
      <BackgroundReflection />
    </Container>
  );
};
