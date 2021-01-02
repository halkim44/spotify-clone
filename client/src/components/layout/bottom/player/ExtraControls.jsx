import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";
import { RiPlayList2Fill } from "react-icons/ri";

import { Button } from "../../../common/Button";
import { setPlayerVolume } from "../../../../services/spotify/player";
import { Slider } from "../../../common/Slider";
import { volumeLocalStorageService } from "../../../../utils/localStorageService";
import { useUserDataState } from "../../../../contexts/userData";

const Container = styled.div`
  display: flex;
  > * {
    display: flex;
  }
`;
const VolumeControl = styled.div`
  width: 125px;
  align-items: center;
  > *:last-of-type {
    margin: 0;
  }
`;

export const ExtraControls = ({ deviceId }) => {
  const userData = useUserDataState().data;
  const [volumePercentage, setVolumePercentage] = useState(
    userData ? volumeLocalStorageService.getVolume(userData.id) : 100
  );
  const [volumeCache, setvolumeCache] = useState(volumePercentage);

  useEffect(() => {
    if (!!userData) {
      setPlayerVolume(volumeLocalStorageService.getVolume(userData.id));
    }
  }, [userData]);

  const toggleMute = () => {
    if (volumePercentage === 0) {
      setPlayerVolume(volumeCache);
      volumeLocalStorageService.setVolume(userData.id, volumeCache);
      setVolumePercentage(volumeLocalStorageService.getVolume(userData.id));
    } else {
      setvolumeCache(volumePercentage);
      setPlayerVolume(0);
      setVolumePercentage(0);
    }
  };

  return (
    <Container>
      <div>
        <Link to="/queue">
          <Button isIcon iconScale=".7" aria-label="queue">
            <RiPlayList2Fill />
          </Button>
        </Link>
      </div>
      <VolumeControl>
        <Button
          isIcon
          iconScale=".8"
          onClick={toggleMute}
          aria-label="mute toggle"
        >
          {volumePercentage === 0 ? (
            <FiVolumeX data-testid="mute-icon" />
          ) : volumePercentage < 50 ? (
            <FiVolume1 />
          ) : (
            <FiVolume2 />
          )}
        </Button>
        <Slider
          progress={volumePercentage}
          endCallback={(perc) => {
            volumeLocalStorageService.setVolume(userData.id, perc);
            setPlayerVolume(perc);
          }}
          dragCalback={(perc) => {
            setVolumePercentage(perc);
          }}
        />
      </VolumeControl>
    </Container>
  );
};
