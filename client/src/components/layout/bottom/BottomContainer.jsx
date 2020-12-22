import styled from "@emotion/styled";
import React, { useState } from "react";
import { SdkIntializer } from "./player/SdkInitializer";
import { transferUsersPlayback } from "../../../services/spotify/player";
import { CurrentPlayingInfo } from "./player/CurrentPlayingInfo";
import { Controls } from "./player/Controls";
import { PlaybackBar } from "./player/PlaybackBar";
import { ExtraControls } from "./player/ExtraControls";
import { tokenLocalStorageService } from "../../../utils/localStorageService";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  padding: 17px 16px;
  background-color: #282828;
  display: flex;
  > * {
    display: flex;
  }
`;

const Left = styled.div`
  justify-content: flex-start;
  width: 30%;
`;
const Middle = styled.div`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;
const Right = styled.div`
  justify-content: flex-end;
  width: 30%;
  align-items: center;
`;

export const BottomContainer = () => {
  const [playback, setPlayback] = useState({
    position: null,
    duration: 0,
    track_window: {
      current_track: null,
    },
    device: {
      volume_percent: 100,
    },
  });
  const [sdkIsAlreadyInit, setsdkIsAlreadyInit] = useState(false);
  const [deviceId, setdeviceId] = useState("");

  const setID = (id) => {
    transferUsersPlayback([id]);
    setdeviceId(id);
  };

  const currentTrack = playback.track_window.current_track;
  return (
    <>
      {console.log(playback)}
      {!sdkIsAlreadyInit && (
        <SdkIntializer
          token={tokenLocalStorageService.getAccessToken()}
          setId={setID}
          onPlayerStateChange={(state) => {
            setPlayback({ ...playback, ...state });
            setsdkIsAlreadyInit(true);
          }}
        />
      )}

      <Container>
        <Left>
          {!!currentTrack && (
            <CurrentPlayingInfo
              album={currentTrack.album}
              trackName={currentTrack.name}
              artists={currentTrack.artists}
            />
          )}
        </Left>
        <Middle>
          <Controls
            isShuffled={playback.shuffle}
            isPaused={
              typeof playback.paused === "undefined" ? true : playback.paused
            }
            repeatMode={playback.repeat_mode}
            prevTracks={playback.track_window.previous_tracks}
            nextTracks={playback.track_window.next_tracks}
          />
          <PlaybackBar
            trackPosition={playback.position}
            trackDuration={playback.duration}
            isPlaying={
              typeof playback.paused === "undefined" ? false : !playback.paused
            }
            timestamp={playback.timestamp}
          />
        </Middle>
        <Right>
          <ExtraControls deviceId={deviceId} />
        </Right>
      </Container>
    </>
  );
};
