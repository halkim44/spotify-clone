import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  &:not(:first-of-type) {
    margin-top: 40px;
  }
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 16px;
  > a > *:hover {
    text-decoration: underline;
  }
  > *:first-of-type {
    flex: 2;
  }
  > *:last-of-type {
    display: flex;
  }
`;

const Title = styled.h3`
  line-height: 33px;
  display: inline;
  font-size: 1.36em;
`;
const SeeAll = styled.span`
  font-size: 0.75em;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.6);
  align-self: flex-end;
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
  height: 284px;
  `}
  > * {
    height: 284px;
  }
`;

export const CardGroup = ({
  children,
  title,
  seeAllLink,
  freeHeight = false,
}) => {
  return (
    <Container>
      <Header>
        {!!seeAllLink ? (
          <>
            <Link to={seeAllLink}>
              <Title>{title}</Title>
            </Link>
            <Link to={seeAllLink}>
              <SeeAll>SEE ALL</SeeAll>
            </Link>
          </>
        ) : (
          <Title>{title}</Title>
        )}
      </Header>
      <CardContainer freeHeight={freeHeight}>{children}</CardContainer>
    </Container>
  );
};
