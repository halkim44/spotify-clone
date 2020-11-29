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
