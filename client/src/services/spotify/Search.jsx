import { spotifyApi } from "../../api/spotify";

export const searchSpotify = (
  q,
  type = "album,artist,playlist,track",
  limit = 8,
  offset = 0,
  market = "MY"
) =>
  spotifyApi.get("/search", {
    params: {
      q,
      type,
      market,
      limit,
      offset,
    },
  });
