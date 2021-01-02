import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List } from "../components/common/List";
import { ListHeader } from "../components/common/ListHeader";
import { PlayTools } from "../components/common/playTools";
import { Contents } from "../components/layout/main/Contents";
import { Header } from "../components/layout/main/Header/Header";
import { PlaylistHeader } from "../components/layout/main/Header/PlaylistHeader";
import { getAllGenerator } from "../services/generators";
import { play } from "../services/spotify/player";
import { getPlaylist, getPlaylistItems } from "../services/spotify/playlist";
import { Loading } from "./Loading";

const LoadingList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
`;

export const Playlist = () => {
  const playlistId = useParams().id;
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    const fields = [
      "tracks",
      "id",
      "description",
      "followers(total)",
      "images",
      "name",
      "owner",
      "type",
      "uri",
    ];
    getPlaylist(playlistId, fields.join(",")).then((res) =>
      setPlaylistData(res.data)
    );
  }, [playlistId]);

  useEffect(() => {
    if (
      !!playlistData &&
      playlistData.tracks.items.length < playlistData.tracks.total
    ) {
      getAllGenerator(
        (offset, limit) => getPlaylistItems(playlistId, null, limit, offset),
        (items) =>
          setPlaylistData((prev) => ({
            ...prev,
            tracks: {
              ...prev.tracks,
              items: [...prev.tracks.items, ...items],
            },
          })),
        [],
        null,
        playlistData.tracks.items.length,
        100
      );
    }
  }, [playlistData, playlistId]);

  return (
    <>
      {!playlistData ? (
        <Loading />
      ) : (
        <div>
          <Header>
            <PlaylistHeader data={playlistData} />
          </Header>
          <Contents>
            <PlayTools uri={playlistData.uri} />
            <ListHeader />

            {playlistData.tracks.items.map((track, i) => (
              <List
                trackData={track.track}
                num={i}
                clickFunction={() =>
                  play(playlistData.uri, null, { position: i })
                }
                key={i}
                showArtist
                testId="playlist-track-list-item-name"
              />
            ))}
            {playlistData.tracks.items.length < playlistData.tracks.total && (
              <LoadingList>Loading...</LoadingList>
            )}
          </Contents>
        </div>
      )}
    </>
  );
};
