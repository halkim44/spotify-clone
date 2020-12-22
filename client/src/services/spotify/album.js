const { spotifyApi } = require("../../api/spotify");

export const getAlbum = (id) => spotifyApi.get("/albums/" + id);

export const getUserSavedAlbum = (limit, offset) =>
  spotifyApi.get("/me/albums", {
    params: {
      limit,
      offset,
    },
  });
