import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { List } from "../../components/common/List";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Contents } from "../../components/layout/main/Contents";
import { useUserDataState } from "../../contexts/userData";
import { play } from "../../services/spotify/player";
import { searchSpotify } from "../../services/spotify/Search";
import { searchHistoryLocalStorageService } from "../../utils/localStorageService";

export const SearchResult = () => {
  const { query } = useParams();
  const { url } = useRouteMatch();
  const userData = useUserDataState().data;

  const [tracks, setTracks] = useState(null);
  const [artists, setArtists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    searchSpotify(query).then((res) => {
      setArtists(res.data.artists.items);
      setAlbums(res.data.albums.items);
      setPlaylists(res.data.playlists.items);
      setTracks(res.data.tracks.items);
    });
  }, [query]);

  useEffect(() => {}, []);
  const addToSearchHistory = (userId, data) => {
    console.log("added to history");
    searchHistoryLocalStorageService.addItemToHistory(userId, data);
  };
  return (
    <div>
      <Contents>
        {!!tracks && (
          <div>
            <SectionHeader title="Tracks" seeAllLink={url + "/tracks"} />
            {tracks.map(
              (track, i) =>
                i < 4 && (
                  <List
                    trackData={track}
                    clickFunction={() => play(null, [track.uri])}
                    key={i}
                    isMini
                  />
                )
            )}
          </div>
        )}
        {!!artists && (
          <CardGroup title={"Artists"} seeAllLink={url + "/artists"}>
            {artists.map((artist, i) => (
              <Card
                className="searchHistory-event"
                data={artist}
                type="artist"
                key={i}
                onClickCallback={() => addToSearchHistory(userData.id, artist)}
              />
            ))}
          </CardGroup>
        )}
        {!!albums && (
          <CardGroup title={"Albums"} seeAllLink={url + "/albums"}>
            {albums.map((album, i) => (
              <Card
                data={album}
                type="album"
                key={i}
                onClickCallback={() => addToSearchHistory(userData.id, album)}
              />
            ))}
          </CardGroup>
        )}
        {!!playlists && (
          <CardGroup title="Playlists" seeAllLink={url + "/playlists"}>
            {playlists.map((playlist, i) => (
              <Card
                data={playlist}
                type="album"
                key={i}
                onClickCallback={() =>
                  addToSearchHistory(userData.id, playlist)
                }
              />
            ))}
          </CardGroup>
        )}
      </Contents>
    </div>
  );
};
