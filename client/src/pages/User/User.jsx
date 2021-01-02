import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";

import { useUserDataState } from "../../contexts/userData";

import { Contents } from "../../components/layout/main/Contents";
import { CardGroup } from "../../components/common/CardGroup";
import { Card } from "../../components/common/Card";
import { UserHeader } from "../../components/layout/main/Header/UserHeader";
import { Header } from "../../components/layout/main/Header/Header";

import { getAllGenerator } from "../../services/generators";
import { getCurrentUserPlaylists } from "../../services/spotify/playlist";
import { getCurrentUserFollowed } from "../../services/spotify/follow";
import { getUserData } from "../../services/spotify/user";

export const User = () => {
  const currentUserData = useUserDataState().data;
  const [data, setData] = useState({ followig: null, playlists: null });
  const { id } = useParams();
  const { url } = useRouteMatch();

  if (!data || data.id !== id) {
    if (currentUserData.id === id) {
      setData(currentUserData);
    } else {
      getUserData(id).then((res) => {
        setData(res.data);
      });
    }
  }
  useEffect(() => {
    if (data && !data.following) {
      getCurrentUserFollowed(8).then((res) => {
        setData((prev) => ({
          ...prev,
          following: res.data.artists,
        }));
      });
    }
    getAllGenerator(
      (offset, limit) => getCurrentUserPlaylists(limit, offset),
      (dataCol) => {
        setData((prev) => ({
          ...prev,
          playlists: dataCol.filter((el) => el.owner.id === currentUserData.id),
        }));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserData]);

  return (
    <div>
      {!!data.following && !!data.playlists && (
        <>
          <Header>
            <UserHeader data={data} />
          </Header>
          <Contents>
            <CardGroup title="Public Playlists" seeAllLink={`${url}/playlists`}>
              {data.playlists.map(
                (playlist, i) =>
                  i < 8 && (
                    <Card data={playlist} type="playlist" key={i} hideSubs />
                  )
              )}
            </CardGroup>
            <CardGroup title="Following" seeAllLink={`${url}/following`}>
              {data.following.items.map((artist, i) => (
                <Card data={artist} type="artist" key={i} />
              ))}
            </CardGroup>
          </Contents>
        </>
      )}
    </div>
  );
};
