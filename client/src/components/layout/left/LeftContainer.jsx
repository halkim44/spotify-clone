import styled from "@emotion/styled";
import React from "react";
import { Sidebar } from "./SideBar";
import { PlaylistSidebar } from "./PlaylistsSidebar";
import { useUserDataState } from "../../../contexts/__mocks__/userData";

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
  let { data } = useUserDataState();

  return (
    <Container>
      <Sidebar />

      {!!data && <PlaylistSidebar />}
    </Container>
  );
};
