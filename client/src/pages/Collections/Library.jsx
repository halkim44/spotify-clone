import styled from "@emotion/styled";
import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { Contents } from "../../components/layout/main/Contents";
import { AlbumLibrary } from "./AlbumLibrary";
import { ArtistsLibrary } from "./ArtistsLibrary";
import { PlaylistLibrary } from "./PlaylistLibrary";

const Container = styled.div`
  margin-top: 58px;
`;
export const Library = () => {
  const { url } = useRouteMatch();
  return (
    <Container>
      <Contents>
        <Switch>
          <Route exact path={url}>
            <Redirect to={url + "/playlists"} />
          </Route>
          <Route path={url + "/playlists"} component={PlaylistLibrary} />
          <Route path={url + "/artists"} component={ArtistsLibrary} />
          <Route path={url + "/albums"} component={AlbumLibrary} />
        </Switch>
      </Contents>
    </Container>
  );
};
