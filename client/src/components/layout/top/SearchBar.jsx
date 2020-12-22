import React, { useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import styled from "@emotion/styled";
import { useHistory, useLocation } from "react-router-dom";

const SearchInput = styled.div`
  background: #fff;
  display: flex;
  position: relative;
  border-radius: 50px;
  padding: 6px 48px;
  width: 364px;
  margin-left: 14px;
  > input {
    border: none;
    outline: none;
    line-height: 2em;
    width: 100%;
  }
  > * {
    color: #000;
    z-index: 12;
  }
  > .search-icon,
  > .clear-input-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    line-height: 0.1em;
  }
  > .search-icon {
    left: 11px;
    font-size: 2em;
  }
  > .clear-input-btn {
    right: 14px;
    font-size: 1.2em;
  }
`;

export const SearchBar = () => {
  const searchInputRef = useRef();
  const appHistory = useHistory();

  const [isSearchEmpty, setisSearchEmpty] = useState(true);
  const [query, setQuery] = useState("");

  const { pathname } = useLocation();

  let queryUrl = pathname.split("/")[2];

  const onUserInput = () => {
    const inputValue = searchInputRef.current.value;
    if (!inputValue.length) {
      setisSearchEmpty(true);
    } else {
      setisSearchEmpty(false);
    }
    setQuery(inputValue);
  };

  if (queryUrl !== query) {
    appHistory.replace("/search/" + query);
  }

  return (
    <SearchInput>
      <div className="search-icon">
        <IoIosSearch />
      </div>
      <input
        type="text"
        name="spotify-search-bar"
        id="search-bar"
        placeholder="Search for Artists, songs or Playlists"
        ref={searchInputRef}
        onInput={onUserInput}
        maxLength="80"
        value={query}
        autoFocus
      />
      {!isSearchEmpty && (
        <div className="clear-input-btn">
          <GrClose />
        </div>
      )}
    </SearchInput>
  );
};
