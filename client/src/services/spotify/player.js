import { spotifyApi } from "../../api/spotify";

export const play = (context_uri = null, uris = null, offset) => {
  const body = {
    context_uri,
    uris,
    offset,
  };

  spotifyApi.put("/me/player/play", body);
};

export const pause = () => spotifyApi.put("/me/player/pause");

export const previous = () => spotifyApi.post("/me/player/previous");

export const next = () => spotifyApi.post("/me/player/next");

export const seek = (positionMs) => {
  console.log("seek is called");
  spotifyApi.put("/me/player/seek", null, {
    params: { position_ms: positionMs },
  });
};
export const setPlayerVolume = (volumePercent) => {
  console.log("volume setter has been called");

  spotifyApi.put("/me/player/volume", null, {
    params: { volume_percent: volumePercent },
  });
};
export const shuffle = (state) => {
  spotifyApi.put("/me/player/shuffle", null, {
    params: { state },
  });
};
export const repeat = (num) => {
  let state;

  if (num === 3) {
    num = 0;
  }

  const repeatMode = ["off", "context", "track"];

  state = repeatMode[num];

  spotifyApi.put("/me/player/repeat", null, {
    params: { state },
  });
};

export const getCurrentPlayback = () => spotifyApi.get("me/player");
export const getAvailableDevices = () => spotifyApi.get("/me/player/devices");

export const transferUsersPlayback = (device_ids, play = false) =>
  spotifyApi.put("me/player", {
    device_ids,
    play,
  });

export const getRecentlyPlayed = (limit, before = null, after = null) =>
  spotifyApi.get("me/player/recently-played", {
    params: {
      limit,
      after,
      before,
    },
  });
