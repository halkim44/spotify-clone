import { spotifyApi } from "../../api/spotify";

export const getUserData = (id) => spotifyApi.get(`/users/${id}`);
