import styled from "@emotion/styled";
import React from "react";
import { Button } from "../components/common/Button";
import { Contents } from "../components/layout/main/Contents";

const Container = styled.div`
  padding-top: 158px;
  text-align: center;
  display: flex;
  justify-content: center;

  height: 100%;
  h1 {
    font-size: 3.2em;
    margin-bottom: 24px;
  }
  .NotLoginPage-btn-wrapper {
    margin-top: 24px;
  }
`;

export const NotLoginPage = () => {
  return (
    <Container>
      <Contents>
        <h1>Welcome to Halkim's Spotify Clone</h1>
        <p>
          To enjoy its features you must be login first using your existing
          spotify account.
        </p>
        <p>
          <strong>Note:</strong> This app require user to have spotify Premium
          account inorder to play music.
        </p>
        <div className="NotLoginPage-btn-wrapper">
          <Button to="/auth/login" aria-label="login">
            LOG IN
          </Button>
        </div>
      </Contents>
    </Container>
  );
};
