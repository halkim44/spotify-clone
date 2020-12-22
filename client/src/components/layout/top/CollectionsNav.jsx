import styled from "@emotion/styled";
import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

const Container = styled.div`
  margin-left: 100px;

  ul {
    display: flex;
  }
`;

const NavItem = styled.li`
  > a {
    padding: 8px 16px;
    margin-right: 8px;
    font-size: 0.875em;
    border-radius: 3px;
    ${({ isActive }) =>
      isActive &&
      `
      background-color: #333;
      `}
  }
`;
export const CollectionsNav = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <nav>
        <ul>
          <NavItem isActive={/^\/collections\/playlists/.test(pathname)}>
            <Link to="/collections/playlists">
              <span>Playlists</span>
            </Link>
          </NavItem>
          <NavItem isActive={/^\/collections\/artists/.test(pathname)}>
            <Link to="/collections/artists">
              <span>Artists</span>
            </Link>
          </NavItem>
          <NavItem isActive={/^\/collections\/albums/.test(pathname)}>
            <Link to="/collections/albums">
              <span>Albums</span>
            </Link>
          </NavItem>
        </ul>
      </nav>
    </Container>
  );
};
