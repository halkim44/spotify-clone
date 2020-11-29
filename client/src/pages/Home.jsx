import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { CardGroup } from "../components/common/CardGroup";
import { Card } from "../components/common/Card";
import {
  getData,
  getRecentPlayedUri,
  populateUriArray,
} from "../services/general";
import { spotifyApi } from "../api/spotify";

const Container = styled.div`
  margin-top: 58px;
`;
const ContentContainer = styled.div`
  padding: 24px 32px;
`;

export const Home = () => {
  const [recentlyPlayedData, setRecentlyPlayedData] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [recomendedSongs, setRecomendedSongs] = useState(null);

  useEffect(() => {
    getRecentPlayedUri(
      (uriArray) =>
        populateUriArray(uriArray, setRecentlyPlayedData, spotifyApi),
      spotifyApi,
      "/me/player/recently-played",
      50
    );

    getData(spotifyApi, "/me/top/artists", setTopArtist, { limit: 5 });
  }, []);

  return (
    <Container>
      <ContentContainer>
        {!!topArtist &&
          recomendedSongs == null &&
          getData(spotifyApi, "/recommendations", setRecomendedSongs, {
            seed_artists: topArtist.items.map((item) => item.id).join(","),
            limit: 8,
          })}
        {!!recentlyPlayedData && (
          <CardGroup title="Recently Played">
            {recentlyPlayedData.map(({ data }, i) => (
              <Card data={data} type={data.type} key={i} />
            ))}
          </CardGroup>
        )}
        {!!recomendedSongs && (
          <CardGroup title="Recommended">
            {recomendedSongs.tracks.map(({ album }, i) => (
              <Card data={album} type={album.type} key={i} />
            ))}
          </CardGroup>
        )}
      </ContentContainer>
    </Container>
  );
};
