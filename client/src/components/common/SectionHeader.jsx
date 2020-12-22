import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
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

export const SectionHeader = ({ seeAllLink, title }) => {
  return (
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
  );
};
