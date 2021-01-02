import { albumResObj } from "../../../test/fixtures/responseObj";
import { userSavedAlbumResObj } from "../../../test/fixtures/albumsResObj";

export const getAlbum = (id) => Promise.resolve(albumResObj);

export const getUserSavedAlbum = (limit, offset = 0) => {
  if (offset === 0) {
    return Promise.resolve(userSavedAlbumResObj);
  }
  return Promise.resolve({
    data: {
      items: [],
    },
  });
};
