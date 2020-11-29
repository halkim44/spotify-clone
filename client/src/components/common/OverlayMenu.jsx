import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #282828;
  padding: 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  z-index: 10;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;
const ButtonStyled = styled.button`
  font-size: 0.8em;
  padding: 14px 8px 10px;
  display: block;
  width: 100%;
  border-radius: 4px;
  color: hsla(0, 0%, 100%, 0.7);
  text-align: left;
  &:hover {
    color: #fff;
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;

export const OverlayMenu = ({ list }) => {
  return (
    <Container>
      <ul>
        {list.map(({ name, link, exec }, i) => (
          <ListItem key={i}>
            {exec ? (
              <ButtonStyled onClick={exec}>{name}</ButtonStyled>
            ) : (
              <Link to={link}>
                <ButtonStyled>{name}</ButtonStyled>
              </Link>
            )}
          </ListItem>
        ))}
      </ul>
    </Container>
  );
};
