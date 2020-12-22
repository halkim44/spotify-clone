import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../../common/Button";
import { CollectionsNav } from "./CollectionsNav";
import { HistoryManager } from "./HistoryManager";
import { SearchBar } from "./SearchBar";
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

const LeftContent = styled.div``;
const MiddleContent = styled.div`
  flex: 1;
`;

export const TopContainer = ({ isUserAuthenticated, location }) => {
  const { pathname } = useLocation();
  return (
    <Container className="top-container">
      <HistoryManager />
      <MiddleContent>
        {/^\/search/.test(pathname) && <SearchBar />}
        {/^\/collection/.test(pathname) && <CollectionsNav />}
      </MiddleContent>
      <LeftContent>
        {isUserAuthenticated ? (
          <UserDropDown />
        ) : (
          <Button to="/auth/login" aria-label="login">
            LOG IN
          </Button>
        )}
      </LeftContent>
    </Container>
  );
};
