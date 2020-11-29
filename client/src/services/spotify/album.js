const { spotifyApi } = require("../../api/spotify");

export const getAlbum = (id) => spotifyApi.get("/albums/" + id);
