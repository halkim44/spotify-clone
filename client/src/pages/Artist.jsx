import React, { useEffect, useState } from "react";
import { Route, useParams, useRouteMatch } from "react-router-dom";
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
import { Loading } from "./Loading";

export const Artist = () => {
  const { path, url } = useRouteMatch();

  const [artistData, setArtistData] = useState({});
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [appearsOn, setAppearsOn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const artistId = useParams().id;

  useEffect(() => {
    setAppearsOn([]);
    setRelatedArtists([]);
    getArtist(artistId).then((res) => {
      setArtistData(res.data);

      setIsLoading(true);
      Promise.all([
        getRelatedArtists(artistId),
        getArtistAlbums(artistId, "appears_on", "my", 8),
      ]).then((arrayRes) => {
        setRelatedArtists(arrayRes[0].data.artists);
        setAppearsOn(arrayRes[1].data.items);
        setIsLoading(false);
      });
    });
  }, [artistId]);
  return (
    <div>
      <Route exact path={url}>
        {!isLoading ? (
          <>
            <Header>
              <ArtistHeader data={artistData} />
            </Header>
            <Contents>
              <PlayTools uri={artistData.uri} />
              <PopularSongList artistId={artistId} />
              <SectionsOfCards
                title="Discography"
                artistID={artistData.id}
                seeAllLink={`${url}/discography`}
              />
              <CardGroup title="Fans also like" seeAllLink={`${url}/related`}>
                {relatedArtists.map(
                  (artist, i) =>
                    i < 8 && (
                      <Card
                        data={artist}
                        type="artist"
                        key={i}
                        testId="related-artist-card"
                      />
                    )
                )}
              </CardGroup>
              <CardGroup title="Appears On">
                {appearsOn.map(
                  (album, i) =>
                    i < 8 && (
                      <Card
                        data={album}
                        type={album.type}
                        key={i}
                        subtitleTypes={["releaseYear", "typeName"]}
                        testId="appears-on-card"
                      />
                    )
                )}
              </CardGroup>
            </Contents>
          </>
        ) : (
          <Loading />
        )}
      </Route>
      <Route path={`${path}/:dataType`}>
        <SeeAllRouteHandler id={artistId} />
      </Route>
    </div>
  );
};
