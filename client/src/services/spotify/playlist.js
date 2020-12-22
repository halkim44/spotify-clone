import { spotifyApi } from "../../api/spotify";

export const getPlaylist = (id, fields, market, additional_types) =>
  spotifyApi.get("/playlists/" + id, {
    params: {
      market,
      fields,
      additional_types,
    },
  });

export const getPlaylistItems = (id, fields, limit, offset, additional_types) =>
  spotifyApi.get("/playlists/" + id + "/tracks", {
    params: {
      fields,
      limit,
      offset,
      additional_types,
    },
  });
export const getUserPlaylists = (userId, limit, offset) =>
  spotifyApi.get("/users/" + userId + "/playlists", {
    params: {
      limit,
      offset,
    },
  });
export const getCurrentUserPlaylists = (limit, offset) =>
  spotifyApi.get("/me/playlists", {
    params: {
      limit,
      offset,
    },
  });
