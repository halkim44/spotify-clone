import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Redirect } from "react-router-dom";
import { useUserDataState } from "../../../contexts/userData";
import { logoutUser } from "../../../services/auth";
import { OverlayMenu } from "../../common/OverlayMenu";

const Container = styled.div`
  position: relative;
  color: #fff;
`;
const Pill = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50px;
  padding: 2px;
  padding-right: 6px;
  cursor: pointer;
  &:hover {
    background-color: #282828;
  }
  ${({ isActive }) =>
    isActive &&
    `
  background-color: #282828;
`}
`;

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  color: #fff;
  cursor: inherit;

  > span {
    font-size: 0.8em;
    font-weight: 700;
  }
`;
const Figure = styled.figure`
  height: 30px;
  width: 30px;
  margin: 0;
  padding: 0;
  border-radius: 100%;
  overflow: hidden;
  > img {
    height: 100%;
    width: 100%;
  }
`;

const UserName = styled.span`
  margin: 0 6px;
`;
const IconContainer = styled.span`
  > * {
    font-size: 1.8em;
    margin-bottom: -6px;
  }
`;
const OverlayStyled = styled.div`
  position: absolute;
  top: 125%;
  right: 0;
  width: 114%;
`;

export const UserDropDown = () => {
  const [showList, setShowList] = useState(false);
  const userData = useUserDataState().data;
  const [userIsLogout, setuserIsLogout] = useState(false);

  const pillRef = useRef();

  const logoutAndGoHome = () => {
    logoutUser();
    setuserIsLogout(true);
  };

  const list = [
    {
      name: "Profile",
      link: "/user/" + userData.id,
    },
    {
      name: "Log out",
      exec: logoutAndGoHome,
    },
  ];

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!!e.path) {
        if (!e.path.includes(pillRef.current)) {
          setShowList(false);
        }
      }
    });
  }, []);

  return (
    <Container data-testid="user-info">
      {userIsLogout && <Redirect to="/" />}
      <Pill
        data-testid="dropdown-pill"
        onClick={() => setShowList(!showList)}
        isActive={showList}
        ref={pillRef}
      >
        <ButtonStyled>
          <Figure>
            <img src={userData.images[0].url} alt="" />
          </Figure>
          <UserName>{userData.display_name}</UserName>
          <IconContainer>
            <IoMdArrowDropdown />
          </IconContainer>
        </ButtonStyled>
      </Pill>
      {showList && (
        <OverlayStyled data-testid="dd-list">
          <OverlayMenu list={list} />
        </OverlayStyled>
      )}
    </Container>
  );
};
