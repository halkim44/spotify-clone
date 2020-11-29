import styled from "@emotion/styled";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useUserDataState } from "../../../contexts/userData";
import { Album } from "../../../pages/album";
import { Artist } from "../../../pages/artist";
import { Track } from "../../../pages/track";
import { User } from "../../../pages/User/User";
import { NoMatch } from "../../../pages/NoMatch";
import { Home } from "../../../pages/Home";
import { Playlist } from "../../../pages/Playlist";

const Container = styled.div`
  position: fixed;
  left: 232px; // FOR SIDEBAR
  top: 0;
  right: 0;
  overflow-y: auto;
  bottom: 90px;
`;

export const MainContent = () => {
  const userData = useUserDataState().data;

  return (
    <Container>
      {!!userData ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/:id" component={User} />
          <Route path="/track/:id" component={Track} />
          <Route path="/album/:id" component={Album} />
          <Route path="/artist/:id" component={Artist} />
          <Route path="/playlist/:id" component={Playlist} />
          <Route component={NoMatch} />
        </Switch>
      ) : (
        <div>Login suggestion page</div>
      )}
    </Container>
  );
};
