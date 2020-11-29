export const checkHashContains = (str) => window.location.hash.includes(str);

export const getHashParams = (hash) => {
  const hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};
