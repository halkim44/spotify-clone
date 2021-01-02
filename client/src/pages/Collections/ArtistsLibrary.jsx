import React, { useEffect, useState } from "react";
import { getAllGeneratorWithIdOffset } from "../../services/generators";
import { getCurrentUserFollowed } from "../../services/spotify/follow";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { NoCollectionsSign } from "./NoCollectionsSign";
import { Loading } from "../Loading";

export const ArtistsLibrary = () => {
  const [userArtists, setuserArtists] = useState(null);

  useEffect(() => {
    getAllGeneratorWithIdOffset(
      (offset, limit) => getCurrentUserFollowed(limit, offset),
      (data) => setuserArtists(data)
    );
  }, []);

  return (
    <>
      {userArtists === null ? (
        <Loading />
      ) : (
        <div>
          <CardGroup title="Artists" freeHeight>
            {!userArtists.length ? (
              <NoCollectionsSign about={"Artists"} />
            ) : (
              userArtists.map((playlist, i) => (
                <Card
                  data={playlist}
                  type="artists"
                  key={i}
                  testId="library-artist-card"
                />
              ))
            )}
          </CardGroup>
        </div>
      )}
    </>
  );
};
