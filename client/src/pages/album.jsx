import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { Header } from "../components/layout/main/Header/Header";
import { AlbumHeader } from "../components/layout/main/Header/AlbumHeader";
import { getAlbum } from "../services/spotify/album";
import { Loading } from "./Loading";
import { PlayTools } from "../components/common/playTools";
import { Contents } from "../components/layout/main/Contents";
import { ListHeader } from "../components/common/ListHeader";
import { List } from "../components/common/List";
import { getArtistAlbums } from "../services/spotify/artists";
import { CardGroup } from "../components/common/CardGroup";
import { Card } from "../components/common/Card";

// header
// play tools
// list header
// lists
// more by artist

export const Album = () => {
  const { path, url } = useRouteMatch();
  const albumId = useParams().id;
  const [albumData, setalbumData] = useState(null);
  const [moreAlbum, setMoreAlbum] = useState(null);
  useEffect(() => {
    getAlbum(albumId).then((res) => {
      setalbumData(res.data);
    });
  }, [albumId]);

  useEffect(() => {
    if (!!albumData) {
      getArtistAlbums(
        albumData.artists[0].id,
        "album,single",
        "my",
        9 // the list will stay 8 when we exclude current album
      ).then((res) => setMoreAlbum(res.data.items));
    }
  }, [albumData]);

  return (
    <>
      {!albumData ? (
        <Loading />
      ) : (
        <div>
          <Header>
            <AlbumHeader data={albumData} />
          </Header>
          <Contents>
            <PlayTools uri={albumData.uri} />
            <ListHeader noAlbumInfo />
            {albumData.tracks.items.map((track, i) => (
              <>
                <List trackData={track} num={i} noAlbumInfo />
              </>
            ))}
            {!!moreAlbum && (
              <CardGroup title={"More by " + albumData.artists[0].name}>
                {moreAlbum.map(
                  (album, i) =>
                    album.id !== albumId && ( // exclude current album
                      <Card data={album} type="album" key={i} />
                    )
                )}
              </CardGroup>
            )}
          </Contents>
        </div>
      )}
    </>
  );
};
