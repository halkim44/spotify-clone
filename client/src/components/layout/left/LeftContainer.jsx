import styled from "@emotion/styled";
import React from "react";
import { ImSpotify } from "react-icons/im";
import { Sidebar } from "./SideBar";
import { PlaylistSidebar } from "./PlaylistsSidebar";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 90px;
  left: 0;
  width: 232px;
  background-color: #000;
  display: flex;
  flex-direction: column;
`;
export const LeftContainer = () => {
  return (
    <Container>
      <Sidebar />
      <PlaylistSidebar />
    </Container>
  );
};
