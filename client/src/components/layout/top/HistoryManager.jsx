import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useHistory } from "react-router-dom";

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
  ${({ isDisabled }) =>
    isDisabled &&
    `
  opacity: .4;
  `}
`;

const BackForwardBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
`;
export const HistoryManager = () => {
  const appHistory = useHistory();
  const { location, goBack, goForward } = appHistory;

  const keys = useRef([location.key]);
  const previousKey = useRef(location.key);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

  const updateHistory = useCallback((location, action) => {
    const { key } = location;
    if (key === undefined) {
      setCurrentKeyIndex((prev) => prev - 1);
      return;
    }

    if (!keys.current.includes(key)) {
      if (action === "REPLACE" && /^\/search\//.test(location.pathname)) {
        keys.current.splice(keys.current.length - 1, 1, key);
        setCurrentKeyIndex(keys.current.indexOf(key));
        return;
      }
      keys.current = keys.current.slice(
        0,
        keys.current.indexOf(previousKey.current) + 1
      );
      keys.current.push(key);
    }
    setCurrentKeyIndex(keys.current.indexOf(key));
    previousKey.current = key;
  }, []);

  useEffect(() => {
    appHistory.listen(updateHistory);
    return () =>
      appHistory.listen(() => {
        return;
      });
  }, [appHistory, updateHistory]);

  const onClickBack = () => {
    if (currentKeyIndex !== 0) {
      goBack();
    }
  };

  const onClickForward = () => {
    if (currentKeyIndex !== keys.current.length - 1 || keys.current.length) {
      goForward();
    }
  };

  return (
    <BackForwardBtnContainer>
      <CircleButton
        data-testid="back-btn"
        onClick={onClickBack}
        isDisabled={currentKeyIndex === 0}
        aria-label="go back"
      >
        <IoIosArrowBack />
      </CircleButton>
      <CircleButton
        data-testid="forward-btn"
        onClick={onClickForward}
        isDisabled={currentKeyIndex === keys.current.length - 1}
        aria-label="go forward"
      >
        <IoIosArrowForward />
      </CircleButton>
    </BackForwardBtnContainer>
  );
};
