import React, { useEffect, useState } from "react";
import { getUserSavedAlbum } from "../../services/spotify/album";
import { NoCollectionsSign } from "./NoCollectionsSign";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { getAllGenerator } from "../../services/generators";
import { Loading } from "../Loading";

export const AlbumLibrary = () => {
  const [userAlbums, setUserAlbums] = useState(null);

  useEffect(() => {
    getAllGenerator(
      (offset, limit) => getUserSavedAlbum(limit, offset),
      (data) => setUserAlbums(data)
    );
  }, []);
  return (
    <>
      {userAlbums === null ? (
        <Loading />
      ) : (
        <div>
          <CardGroup title="Albums" freeHeight>
            {!userAlbums.length ? (
              <NoCollectionsSign about={"Albums"} />
            ) : (
              userAlbums.map(({ album }, i) => (
                <Card
                  data={album}
                  type="album"
                  key={i}
                  testId="library-album-card"
                />
              ))
            )}
          </CardGroup>
        </div>
      )}
    </>
  );
};
