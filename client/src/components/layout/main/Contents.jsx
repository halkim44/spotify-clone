import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  padding: 24px 32px;
`;

export const Contents = ({ children }) => {
  return <Container>{children}</Container>;
};
