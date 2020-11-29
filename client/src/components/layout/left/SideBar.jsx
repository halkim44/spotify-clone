import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { ImSpotify } from "react-icons/im";
import { VscHome } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
const Container = styled.nav`
  width: 100%;
  height: 100%;
  margin-top: 24px;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  padding-left: 24px;
  margin-bottom: 18px;
  > * {
    margin-top: -2px;
  }
`;
const Logo = styled.span`
  font-size: 2.6em;
  margin-right: 5px;
`;
const LogoName = styled.span`
  font-weight: 600;
  font-size: 1.56em;
  letter-spacing: -1px;
  margin-top: -3px;
`;
const NavClickable = styled.div`
  padding: 0 16px;
  opacity: 0.7;
  transition: opacity 0.2s ease, background-color 0.2s ease;
  &:hover {
    opacity: 1;
  }
  ${({ isActive }) =>
    isActive &&
    `
  background-color: yellow;

  `}
`;

const IconAndTextAligner = styled.div`
  display: flex;
  align-items: center;
  > * {
    line-height: 1em;
  }
`;
const IconWrapper = styled.span`
  font-size: 1.8em;
  margin-right: 16px;
`;
const LinkName = styled.span`
  font-size: 0.8em;
`;
const NavList = styled.ul`
  padding: 0 8px;
`;
export const Sidebar = () => {
  const { pathname } = useLocation();
  const navs = [
    { name: "Home", to: "/", icon: <VscHome /> },
    { name: "Search", to: "/search", icon: <IoIosSearch /> },
    {
      name: "Your Library",
      to: "/collections",
      icon: (
        <svg
          viewBox="0 0 512 512"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M311.873 77.46l166.349 373.587-39.111 17.27-166.349-373.587zM64 463.746v-384h42.666v384h-42.666zM170.667 463.746v-384h42.667v384h-42.666z"
            fill="currentColor"
          ></path>
        </svg>
      ),
    },
  ];

  const getStatusBasedOnPathname = (str) => {
    const cleanStr = str.split("/")[1];
    if (!cleanStr.length) {
      return str === pathname;
    }
    return pathname.includes(cleanStr);
  };

  return (
    <Container>
      <Link to="/">
        <LogoWrapper>
          <IconAndTextAligner>
            <Logo>
              <ImSpotify />
            </Logo>
            <LogoName>Spotify</LogoName>
          </IconAndTextAligner>
        </LogoWrapper>
      </Link>

      <NavList>
        {navs.map((nav, i) => (
          <li key={i}>
            <Link to={nav.to}>
              <NavClickable isActive={getStatusBasedOnPathname(nav.to)}>
                <IconAndTextAligner>
                  <IconWrapper>{nav.icon}</IconWrapper>
                  <LinkName>{nav.name}</LinkName>
                </IconAndTextAligner>
              </NavClickable>
            </Link>
          </li>
        ))}
      </NavList>
    </Container>
  );
};
