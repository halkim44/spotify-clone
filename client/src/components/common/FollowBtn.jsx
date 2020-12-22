import styled from "@emotion/styled";
import React from "react";

const StyledBtn = styled.button`
  padding: 7px 16px;
  color: #fff;
  border: 1px solid hsla(0, 0%, 100%, 0.3);
  font-size: 0.71em;
  letter-spacing: 1.4px;
  font-weight: 600;
  border-radius: 4px;
  &:hover {
    border-color: hsla(0, 0%, 100%, 0.8);
  }
`;

export const FollowBtn = ({ uri }) => {
  return <StyledBtn aria-label="follow-button">FOLLOW</StyledBtn>;
};
