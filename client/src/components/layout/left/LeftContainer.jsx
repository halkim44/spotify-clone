import styled from "@emotion/styled";
import React from "react";
import { ImSpotify } from "react-icons/im";
import { Sidebar } from "./SideBar";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 232px;
  background-color: #000;
`;
export const LeftContainer = () => {
  return (
    <Container>
      <Sidebar />
    </Container>
  );
};
