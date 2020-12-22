import React, { useEffect, useState } from "react";
import { getAllGeneratorWithIdOffset } from "../../services/generators";
import { getCurrentUserFollowed } from "../../services/spotify/follow";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { NoCollectionsSign } from "./NoCollectionsSign";

export const ArtistsLibrary = () => {
  const [userArtists, setuserArtists] = useState([]);

  useEffect(() => {
    getAllGeneratorWithIdOffset(
      (offset, limit) => getCurrentUserFollowed(limit, offset),
      (data) => setuserArtists((prev) => [...prev, ...data])
    );
    getCurrentUserFollowed().then((res) => console.log(res));
  }, []);

  return (
    <div>
      <CardGroup title="Artists" freeHeight>
        {!userArtists.length ? (
          <NoCollectionsSign about={"Artists"} />
        ) : (
          userArtists.map((playlist, i) => (
            <Card data={playlist} type="artists" key={i} />
          ))
        )}
      </CardGroup>
    </div>
  );
};
