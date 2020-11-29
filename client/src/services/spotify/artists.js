import { spotifyApi } from "../../api/spotify";

export const getArtist = (id) => spotifyApi.get("/artists/" + id);

export const getArtistAlbums = (
  id,
  include_groups = null,
  market = null,
  limit = null,
  offset = null
) =>
  spotifyApi.get("/artists/" + id + "/albums", {
    params: {
      market,
      include_groups,
      limit,
      offset,
    },
  });

export const getArtistTopTracks = (id, market) =>
  spotifyApi.get("/artists/" + id + "/top-tracks", {
    params: {
      market,
    },
  });

export const getRelatedArtists = (id) =>
  spotifyApi.get("/artists/" + id + "/related-artists");
