import React, { useEffect, useState } from "react";
import { Route, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { PlayTools } from "../components/common/playTools";
import { SeeAllRouteHandler } from "./see-alls/SeeAllRouteHandler";
import { Contents } from "../components/layout/main/Contents";
import { PopularSongList } from "../components/layout/main/PopularSongList";
import { SectionsOfCards } from "../components/layout/main/SectionOfCards";
import {
  getArtist,
  getArtistAlbums,
  getRelatedArtists,
} from "../services/spotify/artists";
import { CardGroup } from "../components/common/CardGroup";
import { Card } from "../components/common/Card";
import { Header } from "../components/layout/main/Header/Header";
import { ArtistHeader } from "../components/layout/main/Header/ArtistHeader";

export const Artist = () => {
  const { path, url } = useRouteMatch();

  const [artistData, setArtistData] = useState({});
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [appearsOn, setAppearsOn] = useState([]);

  const artistId = useParams().id;

  useEffect(() => {
    getArtist(artistId).then((res) => {
      setArtistData((prev) => ({ ...prev, ...res.data }));
      getRelatedArtists(artistId).then((res) => {
        setRelatedArtists(res.data.artists);
      });
      getArtistAlbums(artistId, "appears_on", "my", 8).then((res) =>
        setAppearsOn(res.data.items)
      );
    });
  }, [artistId]);
  return (
    <div>
      <Route exact path={url}>
        {!!artistData.name ? (
          <>
            <Header>
              <ArtistHeader data={artistData} />
            </Header>
            <Contents>
              <PlayTools uri={artistData.uri} />
              <PopularSongList artistId={artistId} />
              <SectionsOfCards
                title="Discography"
                artistID={artistId}
                seeAllLink={`${url}/discography`}
              />
              <CardGroup title="Fans also like" seeAllLink={`${url}/related`}>
                {relatedArtists.map(
                  (artist, i) =>
                    i < 8 && <Card data={artist} type="artist" key={i} />
                )}
              </CardGroup>
              <CardGroup title="Appears On">
                {appearsOn.map(
                  (album, i) =>
                    i < 8 && <Card data={album} type={album.type} key={i} />
                )}
              </CardGroup>
            </Contents>
          </>
        ) : (
          <div>LOADING</div>
        )}
      </Route>
      <Route path={`${path}/:dataType`}>
        <SeeAllRouteHandler id={artistId} />
      </Route>
    </div>
  );
};
