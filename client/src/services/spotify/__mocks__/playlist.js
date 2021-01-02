import { playlistDataResObj } from "../../../test/fixtures/playlistResObj";
import {
  playlistItemsResObj,
  userPlaylists,
} from "../../../test/fixtures/responseObj";

export const getCurrentUserPlaylists = (limit, offset = 0) => {
  if (offset === 0) {
    return Promise.resolve(userPlaylists);
  }
  return Promise.resolve({
    data: {
      items: [],
    },
  });
};

export const getPlaylist = () => Promise.resolve(playlistDataResObj);
export const getPlaylistItems = () => Promise.resolve(playlistItemsResObj);
