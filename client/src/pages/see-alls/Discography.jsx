import React, { useCallback, useEffect, useState } from "react";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { getArtistAlbums } from "../../services/spotify/artists";

export const Discography = ({ id }) => {
  const [albums, setAlbums] = useState([]);
  const [singles, setSingles] = useState([]);
  const [compilations, setCompilations] = useState([]);

  const discographyDataGenerator = useCallback(
    (callback, discogArray = [], logs = null) => {
      function* getFullDiscography(offset = 0, limit = 50) {
        while (true) {
          console.log(offset);
          yield getArtistAlbums(
            id,
            "album,single,compilation",
            "My",
            limit,
            offset
          ).then(
            // eslint-disable-next-line no-loop-func
            (res) => {
              const { data } = res;

              console.log(offset);
              if (!!data.items.length) {
                return data.items;
              } else {
                return null;
              }
            }
          );
          offset += limit;
        }
      }
      if (!logs) {
        logs = getFullDiscography();
      }

      const next = logs.next();

      next.value.then((data) => {
        if (data) {
          console.log(data);
          discogArray = discogArray.concat(data);
          discographyDataGenerator(callback, discogArray, logs);
        } else {
          callback(discogArray);
        }
      });
    },
    [id]
  );

  function sortArray(data) {
    let albumFiltered = [];
    let singleFiltered = [];
    let compilationFiltered = [];

    data.forEach((el) => {
      console.log(el.album_type === "album");
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
    discographyDataGenerator(sortArray);
  }, [discographyDataGenerator]);

  return (
    <div>
      {console.log(albums)}
      {console.log(singles)}
      {console.log(compilations)}
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
