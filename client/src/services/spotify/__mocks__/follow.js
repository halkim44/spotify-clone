import { currentUserFollowedList } from "../../../test/fixtures/responseObj";

export const getCurrentUserFollowed = (limit, after) => {
  if (typeof after === "string") {
    return Promise.resolve({
      data: {
        artists: {
          items: [],
        },
      },
    });
  }
  return Promise.resolve(currentUserFollowedList);
};
