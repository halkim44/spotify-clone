import React, { useEffect, useState } from "react";
import { getCurrentUserPlaylists } from "../../services/spotify/playlist";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { getAllGenerator } from "../../services/generators";
import { NoCollectionsSign } from "./NoCollectionsSign";
import { Loading } from "../Loading";

export const PlaylistLibrary = () => {
  const [userPlaylists, setuserPlaylists] = useState(null);

  useEffect(() => {
    getAllGenerator(
      (offset, limit) => getCurrentUserPlaylists(limit, offset),
      (data) => {
        setuserPlaylists(data);
      }
    );
  }, []);

  return (
    <>
      {userPlaylists === null ? (
        <Loading />
      ) : (
        <div>
          <CardGroup title="Playlists" freeHeight>
            {!userPlaylists.length ? (
              <NoCollectionsSign about={"Playlists"} />
            ) : (
              userPlaylists.map((playlist, i) => (
                <Card
                  data={playlist}
                  type="playlist"
                  key={i}
                  testId="library-playlist-card"
                />
              ))
            )}
          </CardGroup>
        </div>
      )}
    </>
  );
};
