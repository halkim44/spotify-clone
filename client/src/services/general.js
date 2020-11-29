export const getRecentPlayedUri = (callback, api, path, limit) => {
  api
    .get(path, {
      params: {
        limit,
      },
    })
    .then((res) => {
      const uriList = [];

      res.data.items.forEach((item) => {
        if (
          !!item.context &&
          !uriList.some((arrayItem) => arrayItem === item.context.uri)
        ) {
          uriList.push(item.context.uri);
        }
      });
      callback(uriList);
    });
};

export function populateUriArray(arr, callback, api) {
  const queries = arr.map((item) => {
    const params = item.split(":");
    return () => api.get(`/${params[1]}s/${params[2]}`);
  });

  Promise.all(queries.map((fn) => fn()))
    .then((res) => {
      callback(res);
    })
    .catch((err) => console.log(err));
}

export function getData(api, path, callback, params) {
  api
    .get(path, { params })
    .then((res) => callback(res.data))
    .catch((err) => console.log(err));
}
