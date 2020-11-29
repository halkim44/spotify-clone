export const getIdFromUri = (url) => url.split(":")[2];

export const getMMSSfromMilisec = (ms) => {
  let minArray = (ms / 60000 + "").split(".");
  const min = minArray[0];
  let sec = "00";

  if (minArray.length === 2) {
    sec = 100 + Math.floor(60 * ("." + minArray[1]));
    sec += "";
    sec = sec.split("");
    sec.shift();
    sec = sec.join("");
  }

  return min + ":" + sec;
};
