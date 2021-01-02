import styled from "@emotion/styled";
import React from "react";
import { useLocation, useRouteMatch } from "react-router-dom";

const Container = styled.div`
  background: linear-gradient(45deg, #8c1932, #ff6437 60%);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  p {
    font-size: 2em;
    font-weight: 600;
    margin-left: 150px;
  }
`;

export const NoMatch = () => {
  const { url, path } = useRouteMatch();
  const { pathname } = useLocation();

  console.log(pathname);
  return (
    <Container>
      <p>Sorry, couldn't find that.</p>
    </Container>
  );
};
