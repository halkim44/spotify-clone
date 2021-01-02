import { appearsOnResObj } from "../../../test/fixtures/playlistResObj";
import {
  artistAlbumsResObj,
  artistDataResObj,
  artistTopTracksResObj,
  relatedArtistsResObj,
} from "../../../test/fixtures/responseObj";

export const getArtistAlbums = (artistId, include_groups) => {
  if (include_groups === "appears_on") {
    // this will become string when the function is used
    return Promise.resolve(appearsOnResObj);
  }
  return Promise.resolve(artistAlbumsResObj);
};
export const getArtist = () => Promise.resolve(artistDataResObj);
export const getRelatedArtists = () => Promise.resolve(relatedArtistsResObj);

export const getArtistTopTracks = () => Promise.resolve(artistTopTracksResObj);
