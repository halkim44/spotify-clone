import { spotifyApi } from "../../api/spotify";

export const follow = (type, ids) =>
  spotifyApi.put(
    "/me/following",
    {
      ids,
    },
    {
      params: {
        type,
      },
    }
  );

export const getCurrentUserFollowed = (limit, after, type = "artist") =>
  // as of writing type: "artist" is the only one supported
  spotifyApi.get("/me/following", {
    params: {
      type,
      after,
      limit,
    },
  });
