import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { CardGroup } from "../components/common/CardGroup";
import { Card } from "../components/common/Card";
import { getDataFromUris } from "../services/general";
import { getAllGenerator } from "../services/generators";
import { getRecentlyPlayed } from "../services/spotify/player";
import { getUserTopArtists } from "../services/spotify/artists";
import { getRecommendations } from "../services/spotify/browse";

const Container = styled.div`
  margin-top: 58px;
`;
const ContentContainer = styled.div`
  padding: 24px 32px;
`;

export const Home = () => {
  const [recentlyPlayedSongs, setrecentlyPlayedSongs] = useState(null);
  const [recentlyPlayedContexts, setRecentlyPlayedContexts] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [recomendedSongs, setRecomendedSongs] = useState(null);

  useEffect(() => {
    getAllGenerator(
      (offset, limit) => {
        if (offset === 0) {
          // because we are using before offset and getAllGenerator put 0 as the default offset
          offset = null;
        }
        return getRecentlyPlayed(limit, offset);
      },
      (data) => setrecentlyPlayedSongs(data)
    );
  }, []);

  useEffect(() => {
    if (!!recentlyPlayedSongs) {
      let uris = [];
      recentlyPlayedSongs.forEach(
        (item) => item.context && uris.push(item.context.uri)
      );
      // get all recently played Context Uri
      uris = uris.filter((item, i) => uris.indexOf(item) === i);
      getDataFromUris(uris, setRecentlyPlayedContexts);
    }
  }, [recentlyPlayedSongs]);

  useEffect(() => {
    getUserTopArtists(5).then((res) => setTopArtist(res.data));
  }, []);

  useEffect(() => {
    if (!!topArtist && !!recentlyPlayedSongs) {
      const seedArtists = topArtist.items
        .map((item) => item.id)
        .splice(0, 3)
        .join(",");
      const seedTracks = recentlyPlayedSongs
        .map((item) => item.track.id)
        .splice(Math.floor(Math.random(recentlyPlayedSongs.length)), 2)
        .join(",");
      getRecommendations(8, seedArtists, seedTracks).then((res) =>
        setRecomendedSongs(res.data)
      );
    }
  }, [recentlyPlayedSongs, topArtist]);

  return (
    <Container>
      <ContentContainer>
        {console.log(recentlyPlayedSongs)}
        {!!recentlyPlayedContexts && (
          <CardGroup title="Recently Played">
            {recentlyPlayedContexts.map(({ data }, i) => (
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
