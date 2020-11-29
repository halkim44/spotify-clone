import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useUserDataDispatch, useUserDataState } from "../contexts/userData";
import { loginUser } from "../services/auth";
import { checkHashContains, getHashParams } from "../utils/hash";
import { spotifyApi } from "../api/spotify";
import LocalStorageService from "../services/localStorageService";

export const ManageData = ({ children }) => {
  const updateUserData = useUserDataDispatch();
  const [displayLoading, setDisplayLoading] = useState(true);

  // translate hash to object data and store to localStorage
  let hashCleaner = "";
  if (checkHashContains("access_token")) {
    loginUser(getHashParams(window.location.hash));
    hashCleaner = <Redirect to="/" />;
  }

  let { data } = useUserDataState();
  useEffect(() => {
    if (LocalStorageService.getAccessToken()) {
      if (data === null) {
        spotifyApi
          .get("/me")
          .then((res) => {
            updateUserData({ type: "USER_LOGGED_IN", payload: res.data });
            setDisplayLoading(false);
          })
          .catch((err) => console.log(err));
      }
    } else {
      setDisplayLoading(false);
    }
  }, []);

  return (
    <>
      {hashCleaner}
      {displayLoading ? <div>Loading..</div> : children}
    </>
  );
};
