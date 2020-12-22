export const getAllGenerator = (
  apiGetter,
  callback,
  results = [],
  iterationData = null,
  firstOffset = 0,
  limit = 50
) => {
  if (!iterationData) {
    iterationData = dataIterator(apiGetter, firstOffset, limit);
  }
  const next = iterationData.next();

  next.value.then((data) => {
    if (data) {
      results = results.concat(data);
      getAllGenerator(apiGetter, callback, results, iterationData);
    } else {
      callback(results);
    }
  });
};

function* dataIterator(getter, offset = 0, limit = 50) {
  while (true) {
    yield getter(offset, limit).then((res) => {
      const { data } = res;

      if (!!data.items.length) {
        console.log(data.items);

        return data.items;
      } else {
        return null;
      }
    });

    offset += limit;
  }
}

export const getAllGeneratorWithIdOffset = (
  apiGetter,
  callback,
  results = [],
  iterationData = null,
  firstIdOffset = null,
  limit = 50
) => {
  if (!iterationData) {
    iterationData = dataIteratorWithIdOffset(apiGetter, firstIdOffset, limit);
  }
  const next = iterationData.next();

  next.value.then((data) => {
    if (data) {
      results = results.concat(data);
      getAllGenerator(apiGetter, callback, results, iterationData);
    } else {
      callback(results);
    }
  });
};

function* dataIteratorWithIdOffset(getter, offset = null, limit = 50) {
  let id;
  while (true) {
    // eslint-disable-next-line no-loop-func
    yield getter(offset, limit).then((res) => {
      const { data } = res;

      if (!!data.artists.items.length) {
        id = data.artists.items[data.artists.items.length - 1].id;
        return data.artists.items;
      } else {
        return null;
      }
    });

    offset = id;
  }
}
