import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Loading = () => {
  return (
    <Container data-testid="loading-page">
      <div>Loading...</div>
    </Container>
  );
};
