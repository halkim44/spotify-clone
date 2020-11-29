export const getTotalLengthOfTracks = (arrayOfTracks) =>
  arrayOfTracks.reduce(
    (accumulator, track) => accumulator + track.duration_ms,
    0
  );
