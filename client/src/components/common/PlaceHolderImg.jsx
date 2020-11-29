import styled from "@emotion/styled";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b3b3b3;
  > * {
    width: 76%;
    height: 76%;
  }
`;
export const PlaceHolderImg = ({ type }) => {
  return (
    <Container>
      <AiOutlineUser />
    </Container>
  );
};
