import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { useUserDataState } from "../../contexts/userData";
import styled from "@emotion/styled";
import { Contents } from "../../components/layout/main/Contents";
import { CardGroup } from "../../components/common/CardGroup";
import { Card } from "../../components/common/Card";
import { spotifyApi } from "../../api/spotify";
import { UserHeader } from "../../components/layout/main/Header/UserHeader";
import { Header } from "../../components/layout/main/Header/Header";

const Container = styled.div``;

const CardTest = styled.div`
  height: 100px;
  width: 100%;
  background-color: blue;
`;
export const User = () => {
  const currentUserData = useUserDataState().data;
  const [data, setData] = useState(null);
  const { id } = useParams();
  const { url } = useRouteMatch();

  if (!data || data.id !== id) {
    if (currentUserData.id === id) {
      setData(currentUserData);
    } else {
      spotifyApi
        .get(`/users/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    if (data && !data.following) {
      Promise.all([
        spotifyApi.get("/me/following", {
          params: {
            type: "artist",
            limit: 8,
          },
        }),
        spotifyApi.get("me/playlists", {
          params: {
            limit: 8,
          },
        }),
      ])
        .then((res) => {
          setData({
            ...data,
            following: res[0].data.artists,
            playlists: res[1].data,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [data]);

  return (
    <Container>
      {data && !!data.following && (
        <>
          <Header
          // displayName={data.display_name}
          // imageUrl={data.images[0].url}
          // followingTotal={data.following.total}
          // followerTotal={data.followers.total}
          // playlistTotal={!!data.playlists && data.playlists.total}
          >
            <UserHeader data={data} />
          </Header>
          <Contents>
            <CardGroup title="Public Playlist" seeAllLink={`${url}/playlists`}>
              {!!data.playlists &&
                data.playlists.items.map((playlist, i) => (
                  <Card data={playlist} type="playlist" key={i} />
                ))}
            </CardGroup>
            <CardGroup title="Following" seeAllLink={`${url}/following`}>
              {data.following.items.map((artist, i) => (
                <Card data={artist} type="artist" key={i} />
              ))}
            </CardGroup>
          </Contents>
        </>
      )}
    </Container>
  );
};
