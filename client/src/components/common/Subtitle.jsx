import styled from "@emotion/styled";
import React from "react";

const SubtitleStyled = styled.p`
  font-size: 0.84em;
  > span {
    color: hsla(0, 0%, 100%, 0.7);
  }
  > span:not(:first-of-type):before {
    content: "•";
    margin: 0px 4px;
  }
`;

export const Subititle = ({ arrayOfText }) => {
  return (
    <SubtitleStyled>
      {arrayOfText.map((text, i) => (
        <span key={i}>{text}</span>
      ))}
    </SubtitleStyled>
  );
};
