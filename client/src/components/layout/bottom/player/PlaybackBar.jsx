import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { seek } from "../../../../services/spotify/player";
import { Slider } from "../../../common/Slider";
import { getMMSSfromMilisec } from "../../../../utils/spotifyHelper";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 11px;
  span {
    color: #b3b3b3;
  }
`;

export const PlaybackBar = ({
  trackPosition,
  trackDuration,
  isPlaying,
  timestamp,
}) => {
  const [progressTime, setProgressTime] = useState(trackPosition);

  useEffect(() => {
    setProgressTime(trackPosition);
  }, [trackPosition, timestamp]); // include timestamp for rerender even when trackPosition value is the same

  useEffect(() => {
    let intervalId = null;
    if (isPlaying) {
      intervalId = setInterval(() => {
        if (trackPosition < trackDuration) {
          setProgressTime((prev) => prev + 1000);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [trackPosition, isPlaying, trackDuration]);

  const updatePlaybackPosition = (position) => {
    const seekPosition = Math.floor(trackDuration * (position / 100));
    seek(seekPosition);
  };

  function updateProgressTime(position) {
    const seekPosition = Math.floor(trackDuration * (position / 100));

    setProgressTime(seekPosition);
  }

  return (
    <Container>
      <span>{getMMSSfromMilisec(progressTime)}</span>
      <Slider
        progress={(progressTime / trackDuration) * 100}
        endCallback={updatePlaybackPosition}
        dragCalback={updateProgressTime}
        key={trackDuration}
        testId="playback-position-slider"
      />

      <span>{getMMSSfromMilisec(trackDuration)}</span>
    </Container>
  );
};
