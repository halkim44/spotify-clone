import React, { useEffect, useState } from "react";
import { getUserSavedAlbum } from "../../services/spotify/album";
import { NoCollectionsSign } from "./NoCollectionsSign";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { getAllGenerator } from "../../services/generators";

export const AlbumLibrary = () => {
  const [userAlbums, setUserAlbums] = useState([]);

  useEffect(() => {
    getAllGenerator(
      (offset, limit) => getUserSavedAlbum(limit, offset),
      (data) => setUserAlbums((prev) => [...prev, ...data])
    );
  }, []);

  return (
    <div>
      {console.log(userAlbums)}
      <CardGroup title="Albums" freeHeight>
        {!userAlbums.length ? (
          <NoCollectionsSign about={"Albums"} />
        ) : (
          userAlbums.map(({ album }, i) => (
            <Card data={album} type="album" key={i} />
          ))
        )}
      </CardGroup>
    </div>
  );
};
