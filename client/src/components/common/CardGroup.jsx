import styled from "@emotion/styled";
import React from "react";
import { SectionHeader } from "./SectionHeader";

const Container = styled.div`
  &:not(:first-of-type) {
    margin-top: 40px;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-template-rows: 1fr;
  overflow: hidden;
  grid-auto-rows: auto;
  ${({ freeHeight }) =>
    !freeHeight &&
    `
    max-height: 261px;
  `}
`;

export const CardGroup = ({
  children,
  title,
  seeAllLink,
  freeHeight = false,
}) => {
  return (
    <Container>
      <SectionHeader title={title} seeAllLink={seeAllLink} />
      <CardContainer freeHeight={freeHeight}>{children}</CardContainer>
    </Container>
  );
};
