import React, { useEffect, useState } from "react";
import { getCurrentUserPlaylists } from "../../services/spotify/playlist";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { getAllGenerator } from "../../services/generators";
import { NoCollectionsSign } from "./NoCollectionsSign";

export const PlaylistLibrary = () => {
  const [userPlaylists, setuserPlaylists] = useState([]);

  useEffect(() => {
    getAllGenerator(
      (offset, limit) =>
        getCurrentUserPlaylists(limit, offset).catch((err) => console.log(err)),
      (data) => setuserPlaylists((prev) => [...prev, ...data])
    );
  }, []);

  return (
    <div>
      <CardGroup title="Playlists" freeHeight>
        {!userPlaylists.length ? (
          <NoCollectionsSign about={"Playlists"} />
        ) : (
          userPlaylists.map((playlist, i) => (
            <Card data={playlist} type="playlist" key={i} />
          ))
        )}
      </CardGroup>
    </div>
  );
};
