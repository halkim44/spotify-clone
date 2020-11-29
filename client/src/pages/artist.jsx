import React, { useEffect, useState } from "react";
import { Route, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { PlayTools } from "../components/common/playTools";
import { SeeAllRouteHandler } from "./see-alls/SeeAllRouteHandler";
import { Contents } from "../components/layout/main/Contents";
import { PopularList } from "../components/layout/main/PopularList";
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
      {console.log(artistData)}

      <Route exact path={url}>
        {!!artistData.name ? (
          <>
            <Header>
              <ArtistHeader data={artistData} />
            </Header>
            {console.log(artistData)}
            <Contents>
              <PlayTools uri={artistData.uri} />
              <PopularList artistId={artistId} />
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
