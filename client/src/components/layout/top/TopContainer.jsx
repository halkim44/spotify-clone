import styled from "@emotion/styled";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Button } from "../../common/Button";
import { UserDropDown } from "./UserDropdown";
const Container = styled.div`
  padding: 12px 32px;
  display: flex;
  position: fixed;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  justify-content: space-between;
  z-index: 10;
  margin-left: 232px; // FOR SIDEBAR
`;

const CircleButton = styled.button`
  background: #000;
  color: #fff;
  border-radius: 50%;
  padding: 4px;
  > svg {
    display: block;
    width: 26px;
    height: 26px;
  }
`;

const BackForwardBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
`;

const LeftContent = styled.div``;

export const TopContainer = ({ isUserAuthenticated }) => {
  return (
    <Container className="top-container">
      <BackForwardBtnContainer>
        <CircleButton data-testid="back-btn">
          <IoIosArrowBack />
        </CircleButton>
        <CircleButton data-testid="forward-btn">
          <IoIosArrowForward />
        </CircleButton>
      </BackForwardBtnContainer>
      <LeftContent>
        {isUserAuthenticated ? (
          <UserDropDown />
        ) : (
          <Button to="/auth/login">LOG IN</Button>
        )}
      </LeftContent>
    </Container>
  );
};
