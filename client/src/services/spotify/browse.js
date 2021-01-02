import { spotifyApi } from "../../api/spotify";

export const getRecommendations = (limit, seed_artists, seed_tracks) =>
  spotifyApi.get("/recommendations", {
    params: {
      limit,
      seed_tracks,
      seed_artists,
    },
  });
