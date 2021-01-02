import styled from "@emotion/styled";
import React from "react";

import { Route, Switch } from "react-router-dom";
import { useUserDataState } from "../../../contexts/userData";
import { Album } from "../../../pages/Album";
import { Artist } from "../../../pages/Artist";
import { User } from "../../../pages/User/User";
import { NoMatch } from "../../../pages/NoMatch";
import { Home } from "../../../pages/Home";
import { Playlist } from "../../../pages/Playlist";
import { SearchPage } from "../../../pages/Search/SearchPage";
import { Queue } from "../../../pages/Queue";
import { Library } from "../../../pages/Collections/Library";
import { ScrollBar } from "../../common/ScrollBar";
import { NotLoginPage } from "../../../pages/NotLoginPage";

const Container = styled.div`
  position: fixed;
  left: 232px; // FOR SIDEBAR
  top: 0;
  right: 0;
  bottom: 90px;
`;

export const MainContent = () => {
  const userData = useUserDataState().data;

  const changeBackgroundOpacity = (opacityValue, className) => {
    const elementDom = document.querySelector("." + className);
    elementDom.style.backgroundColor = "rgba(0,0,0," + opacityValue + ")";
  };
  const stickify = (className) => {
    const element = document.querySelector("." + className);
    const elementSensor = document.querySelector(".sticky-sensor");

    if (element && elementSensor) {
      if (elementSensor.getBoundingClientRect().top <= 58) {
        element.style.position = "fixed";
        element.style.top = "58px";
        element.style.left = "232px";
        element.style.right = "0px";
        element.style.padding = "6px 56px";
        element.style.background = "#181818";
        element.style.zIndex = "7";
      } else {
        element.style.position = "";
        element.style.top = "";
        element.style.left = "";
        element.style.right = "";
        element.style.padding = "";
        element.style.background = "";
        element.style.zIndex = "";
      }
    }
  };
  const darkenTopMenu = (scrollValue, className) => {
    if (scrollValue < 100) {
      const opacityValue = scrollValue / 100;
      changeBackgroundOpacity(opacityValue, className);
    } else if (scrollValue > 100) {
      changeBackgroundOpacity(1, className);
    }
  };

  return (
    <Container className="main-content-scroll-event">
      <ScrollBar
        onScrollCallback={(e) => {
          darkenTopMenu(e.currentTarget.scrollTop, "top-container");
          stickify("sticky-list-header");
        }}
      >
        {!!userData ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:id" component={User} />
            <Route path="/album/:id" component={Album} />
            <Route path="/artist/:id" component={Artist} />
            <Route path="/playlist/:id" component={Playlist} />
            <Route path="/search" component={SearchPage} />
            <Route path="/collections" component={Library} />
            <Route path="/queue" component={Queue} />
            <Route component={NoMatch} />
          </Switch>
        ) : (
          <NotLoginPage />
        )}
      </ScrollBar>
    </Container>
  );
};
