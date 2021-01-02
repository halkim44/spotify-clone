import { playbackState } from "../../../test/fixtures/playbackState";
export const SDKInitializer = (token, setId, onPlayerStateChange) => {
  onPlayerStateChange(playbackState);
};
