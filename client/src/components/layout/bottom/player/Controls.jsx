import styled from "@emotion/styled";
import React from "react";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { BiShuffle } from "react-icons/bi";
import { IoIosRepeat } from "react-icons/io";
import {
  next,
  pause,
  play,
  previous,
  repeat,
  shuffle,
} from "../../../../services/spotify/player";
import { Button } from "../../../common/Button";

const Container = styled.div`
  margin-bottom: 10px;
`;

const PlaybackControlWrapper = styled.div`
  width: 224px;
  display: flex;
  justify-content: space-between;
`;

const RepeatBtnWrapper = styled.div`
  ${({ mode }) => {
    let str = "";
    if (mode > 0) {
      str += `
    svg {
      fill: #1db954 !important;
    }
    > *:hover {
      svg {
        fill: #1ed760 !important;
      }
    }
    `;
    }

    if (mode === 2) {
      str += `
      > * {
        position: relative;
        &::before {
          color: #000;
          content: "1";
          position: absolute;
          right: 2px;
          top: 2px;
          line-height: 6px;
          padding: 3px 3px 2px 1px;
          width: 6px;
          font-size: 8px;
          font-weight: 800;
          border-radius: 50%;
          background-color: #1db954;
          border: 2px solid #282828;
        }
        &:hover::before {
          background-color: #1ed760;
        }
      }
      `;
    }

    return str;
  }}
`;

const CircleBtnWrapper = styled.div`
  border: 1px solid;
  border-radius: 50%;
  display: flex;
  &:hover {
    transform: scale(1.14);
  }
`;
export const Controls = ({
  isPaused,
  isShuffled,
  repeatMode,
  nextTracks = [],
  prevTracks = [],
}) => {
  return (
    <Container>
      <PlaybackControlWrapper>
        {/* SHUFFLE */}
        <div>
          <Button
            onClick={() => shuffle(!isShuffled)}
            iconScale={0.74}
            isActive={isShuffled}
            isIcon
          >
            <BiShuffle />
          </Button>
        </div>

        {/* PREVIOUS */}
        <div>
          <Button
            onClick={() => !!prevTracks.length && previous()}
            isDisabled={!prevTracks.length}
            isIcon
          >
            <MdSkipPrevious />
          </Button>
        </div>

        {/* PLAY PAUSE */}
        <CircleBtnWrapper>
          {isPaused ? (
            <Button className="play-pause-btn" onClick={() => play()} isIcon>
              <MdPlayArrow />
            </Button>
          ) : (
            <Button className="play-pause-btn" onClick={pause} isIcon>
              <MdPause />
            </Button>
          )}
        </CircleBtnWrapper>

        {/* NEXT */}
        <div>
          <Button
            onClick={() => !!nextTracks.length && next()}
            isIcon
            isDisabled={!nextTracks.length}
          >
            <MdSkipNext />
          </Button>
        </div>

        {/* REPEAT */}
        <RepeatBtnWrapper mode={repeatMode}>
          <Button onClick={() => repeat(repeatMode + 1)} isIcon>
            <IoIosRepeat />
          </Button>
        </RepeatBtnWrapper>
      </PlaybackControlWrapper>
    </Container>
  );
};
