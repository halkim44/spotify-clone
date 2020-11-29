import styled from "@emotion/styled";
import React from "react";

const ButtonStyled = styled.button`
  ${({ isIcon, iconScale, isActive, isDisabled }) =>
    isIcon
      ? `
  width: 24px;
  height: 24px;
  padding: 4px;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3b3b3;
  display: inline-block;
  > svg {
    width: 100%;
    height: 100%;
    color: inherit;
    ${!!iconScale ? `transform: scale(${iconScale});` : ""}
    ${!!isActive ? `color: #1db954;` : ""}
  }
  ${
    !!isDisabled
      ? `
  cursor: default;
  > svg {
    color: #535353;
  }
  `
      : ""
  }

  &:hover {
    color: #fff;
    > svg {
      color: #fff;
    ${!!isActive ? `color: #1ed760;` : ""}
    }
  }

      `
      : `
  font-size: 0.82em;
  font-weight: 700;
  color: #333;
  letter-spacing: 0.1em;
  background-color: #fff;
  padding: 10px 38px;
  border-radius: 100px;
  cursor: pointer;
  &:hover {
    transform: scale(1.06);
  }`}
`;

export const Button = ({
  children,
  to,
  isIcon,
  iconScale,
  isActive,
  isDisabled,
  ...rest
}) => {
  return (
    <>
      {to ? (
        <a href={to}>
          <ButtonStyled
            {...rest}
            isIcon
            iconScale={iconScale}
            isActive={isActive}
            isDisabled={isDisabled}
          >
            {children}
          </ButtonStyled>
        </a>
      ) : (
        <ButtonStyled
          {...rest}
          isIcon
          iconScale={iconScale}
          isActive={isActive}
          isDisabled={isDisabled}
        >
          {children}
        </ButtonStyled>
      )}
    </>
  );
};
