import styled from "@emotion/styled";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";
import { RiPlayList2Fill } from "react-icons/ri";

import { Button } from "../../../common/Button";
import { setPlayerVolume } from "../../../../services/spotify/player";
import { Slider } from "../../../common/Slider";

const Container = styled.div`
  display: flex;
  > * {
    display: flex;
  }
`;
const ViewPlaylist = styled.div``;
const VolumeControl = styled.div`
  width: 125px;
  align-items: center;
  > *:last-of-type {
    margin: 0;
  }
`;

export const ExtraControls = ({ deviceId }) => {
  const [volumePercentage, setVolumePercentage] = useState(100);
  const [volumeCache, setvolumeCache] = useState(volumePercentage);
  const onMouseDownHandler = (e) => {
    const elWidth = e.currentTarget.offsetWidth;
    const point = e.screenX - e.currentTarget.offsetLeft;

    const seekPosition = Math.floor(100 * (point / elWidth));
    setVolumePercentage(seekPosition);
    setPlayerVolume(seekPosition);
  };

  // useEffect(() => {
  //   getAvailableDevices().then((res) => {
  //     const { devices } = res.data;
  //     let deviceInfo = devices.find((device) => device.id === deviceId);
  //     if (deviceInfo) {
  //       setVolumePercentage(deviceInfo.volume_percent);
  //     }
  //   });
  // }, [deviceId]);

  const toggleMute = () => {
    if (volumePercentage === 0) {
      setPlayerVolume(volumeCache);
      setVolumePercentage(volumeCache);
    } else {
      setvolumeCache(volumePercentage);
      setPlayerVolume(0);
      setVolumePercentage(0);
    }
  };

  return (
    <Container>
      <ViewPlaylist>
        <Link to="/queue">
          <Button isIcon iconScale=".7">
            <RiPlayList2Fill />
          </Button>
        </Link>
      </ViewPlaylist>
      <VolumeControl>
        <Button isIcon iconScale=".8" onClick={toggleMute}>
          {volumePercentage === 0 ? (
            <FiVolumeX />
          ) : volumePercentage < 50 ? (
            <FiVolume1 />
          ) : (
            <FiVolume2 />
          )}
        </Button>
        <Slider
          progress={volumePercentage}
          mouseDown={onMouseDownHandler}
          endCallback={(perc) => {
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
