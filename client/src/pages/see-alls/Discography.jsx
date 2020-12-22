import React, { useEffect, useState } from "react";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { getAllGenerator } from "../../services/generators";
import { getArtistAlbums } from "../../services/spotify/artists";

export const Discography = ({ id }) => {
  const [albums, setAlbums] = useState([]);
  const [singles, setSingles] = useState([]);
  const [compilations, setCompilations] = useState([]);

  function sortArray(data) {
    let albumFiltered = [];
    let singleFiltered = [];
    let compilationFiltered = [];

    data.forEach((el) => {
      if (el.album_type === "album") {
        albumFiltered.push(el);
      } else if (el.album_type === "single") {
        singleFiltered.push(el);
      } else if (el.album_type === "compilation") {
        compilationFiltered.push(el);
      }
    });
    setAlbums(albumFiltered);
    setSingles(singleFiltered);
    setCompilations(compilationFiltered);
  }
  useEffect(() => {
    getAllGenerator(
      (offset, limit) =>
        getArtistAlbums(id, "album,single,compilation", "My", limit, offset),
      sortArray
    );
  }, [id]);

  return (
    <div>
      {!!albums.length && (
        <CardGroup title="Albums" freeHeight>
          {albums.map((album, i) => (
            <Card data={album} type="album" key={i} />
          ))}
        </CardGroup>
      )}
      {!!singles.length && (
        <CardGroup title="Singles and EPs" freeHeight>
          {singles.map((single, i) => (
            <Card data={single} type="album" key={i} />
          ))}
        </CardGroup>
      )}
      {!!compilations.length && (
        <CardGroup title="Compilations" freeHeight>
          {compilations.map((compilation, i) => (
            <Card data={compilation} type="album" key={i} />
          ))}
        </CardGroup>
      )}
    </div>
  );
};
