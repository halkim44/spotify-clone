import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllGenerator } from "../../../services/generators";
import { getCurrentUserPlaylists } from "../../../services/spotify/playlist";
import { Card } from "../../common/Card";
import { ScrollBar } from "../../common/ScrollBar";

const Container = styled.div`
  padding-bottom: 0;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  > * {
    color: #b3b3b3;
  }
  h3 {
    padding: 6px 24px;
    font-size: 0.8em;
  }
  hr {
    height: 1px;
    margin-right: 24px;
    margin-left: 24px;
    border-color: #282828;
  }
`;

const ListItem = styled.li`
  font-size: 0.8em;
  padding: 0 24px;
  > * {
    display: block;
    padding: 6px 0;
    &:hover span {
      color: #fff;
    }
  }
  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #b3b3b3;
  }
  ${({ isAtive }) =>
    isAtive &&
    `
  span {
    color: #fff;
  }
  `}
`;
const ListContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;
export const PlaylistSidebar = () => {
  const { pathname } = useLocation();

  const [userPlaylists, setuserPlaylists] = useState([]);
  const isPathnameContainId = (id) => {
    id += "";
    if (id === "/") {
      return id === pathname;
    }
    console.log(pathname);
    const re = new RegExp(id);
    return re.test(pathname);
  };

  useEffect(() => {
    getAllGenerator(
      (offset, limit) =>
        getCurrentUserPlaylists(limit, offset).catch((err) => console.log(err)),
      (data) => setuserPlaylists((prev) => [...prev, ...data])
    );
  }, []);
  return (
    <Container>
      <h3>PLAYLISTS</h3>
      <hr />
      <ListContainer>
        <ScrollBar>
          <ul>
            {userPlaylists.map((playlist, i) => (
              <ListItem key={i} isAtive={isPathnameContainId(playlist.id)}>
                <Link to={"/playlist/" + playlist.id}>
                  <span>{playlist.name}</span>
                </Link>
              </ListItem>
            ))}
          </ul>
        </ScrollBar>
      </ListContainer>
    </Container>
  );
};
