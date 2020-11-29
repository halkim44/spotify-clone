import React, { useEffect, useState } from "react";
import { getArtistAlbums } from "../../../services/spotify/artists";
import { Card } from "../../common/Card";
import { CardGroup } from "../../common/CardGroup";

export const SectionsOfCards = ({ title, artistID, seeAllLink }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getArtistAlbums(artistID, "album,single,compilation", "MY", 8).then((res) =>
      setData(res.data.items)
    );
  }, []);
  return (
    <CardGroup title={title} seeAllLink={seeAllLink}>
      {data.map((datum, i) => (
        <Card data={datum} type={datum.type} key={i} />
      ))}
    </CardGroup>
  );
};
