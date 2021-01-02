import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useUserDataState } from "../../../contexts/userData";
import { getArtistTopTracks } from "../../../services/spotify/artists";

import { List } from "../../common/List";

const Container = styled.div``;
const SeeMoreBtn = styled.button`
  margin: 24px;
  font-size: 0.74em;
  font-weight: 600;
  color: #b3b3b3;
  letter-spacing: 2px;
  &:hover {
    color: #fff;
  }
`;

export const PopularSongList = ({ artistId }) => {
  const userMarket = useUserDataState().data.country;
  const [topTracks, setTopTracks] = useState([]);
  const [numOfListToDisplay, setNumOfListToDisplay] = useState(5);

  useEffect(() => {
    getArtistTopTracks(artistId, userMarket).then((res) => {
      setTopTracks(res.data.tracks);
    });
  }, [artistId, userMarket]);
  return (
    <Container>
      <h2>Popular</h2>
      <ul>
        {topTracks.map(
          (track, i) =>
            i < numOfListToDisplay && (
              <List
                trackData={track}
                num={i}
                key={i}
                testId="popular-track-list-item"
              />
            )
        )}
      </ul>
      <SeeMoreBtn
        onClick={() => {
          if (numOfListToDisplay === 5) {
            setNumOfListToDisplay(10);
          } else {
            setNumOfListToDisplay(5);
          }
        }}
        aria-label="see more popular songs"
        data-testid="see-more-button"
      >
        {numOfListToDisplay === 5 ? "SEE MORE" : "SHOW LESS"}
      </SeeMoreBtn>
    </Container>
  );
};
