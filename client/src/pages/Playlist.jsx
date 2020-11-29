import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List } from "../components/common/List";
import { ListHeader } from "../components/common/ListHeader";
import { PlayTools } from "../components/common/playTools";
import { Contents } from "../components/layout/main/Contents";
import { AlbumHeader } from "../components/layout/main/Header/AlbumHeader";
import { Header } from "../components/layout/main/Header/Header";
import { PlaylistHeader } from "../components/layout/main/Header/PlaylistHeader";
import { play } from "../services/spotify/player";
import { getPlaylist, getPlaylistItems } from "../services/spotify/playlist";
import { Loading } from "./Loading";

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

  const getAllTracks = useCallback(
    (callback, discogArray = [], logs = null, firstOffset = 0) => {
      function* startGettingItems(offset, limit = 100) {
        while (true) {
          console.log(offset);
          yield getPlaylistItems(playlistId, null, limit, offset).then(
            // eslint-disable-next-line no-loop-func
            (res) => {
              const { data } = res;

              console.log(offset);
              if (!!data.items.length) {
                return data.items;
              } else {
                return null;
              }
            }
          );
          offset += limit;
        }
      }

      if (!logs) {
        console.log(firstOffset);
        logs = startGettingItems(firstOffset, 45);
      }

      const next = logs.next();

      next.value.then((data) => {
        if (data) {
          console.log(data);
          discogArray = discogArray.concat(data);
          getAllTracks(callback, discogArray, logs);
        } else {
          callback(discogArray);
        }
      });
    },
    [playlistId]
  );
  useEffect(() => {
    if (
      !!playlistData &&
      playlistData.tracks.items.length < playlistData.tracks.total
    ) {
      getAllTracks(
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
        playlistData.tracks.items.length
      );
    }
  }, [getAllTracks, playlistData]);

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
            {console.log(playlistData)}
            <PlayTools uri={playlistData.uri} />
            <ListHeader />

            {playlistData.tracks.items.map((track, i) => (
              <List
                trackData={track.track}
                num={i}
                clickFunction={() =>
                  play(playlistData.uri, null, { position: i })
                }
              />
            ))}
          </Contents>
        </div>
      )}
    </>
  );
};
