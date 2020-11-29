export const prettyMS = (ms) => {
  let str = "";
  //HOURS
  console.log(ms);

  if (ms > 0) {
    const hours = Math.floor(ms / 3.6e6);
    console.log(hours);
    ms = ms - hours * 3.6e6;
    console.log(ms);
    if (hours > 0) {
      str += `${hours} hours `;
    }
  }
  if (ms > 0) {
    const min = Math.floor(ms / 60000);
    ms = ms - min * 60000;
    console.log(min);
    console.log(ms);
    if (min > 0) {
      str += `${min} min `;
    }
  }
  if (ms > 0) {
    const sec = Math.floor(ms / 1000);
    if (sec > 0) {
      str += `${sec} sec`;
    }
  }
  return str;
};
