export const SDKInitializer = (token, setId, onPlayerStateChange) => {
  async function waitForSpotifyWebPlaybackSDKToLoad() {
    return new Promise((resolve) => {
      if (window.Spotify) {
        resolve(window.Spotify);
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify);
        };
      }
    });
  }
  (async () => {
    const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();

    const player = new Player({
      name: "Halkim's spotify player",
      volume: 1.0,
      getOAuthToken: (cb) => {
        cb(token);
      },
    });

    // Error handling
    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });

    // Playback status updates

    // Ready
    player.addListener("ready", ({ device_id }) => {
      setId(device_id);
      console.log("playBack ready");
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });
    player.addListener("player_state_changed", onPlayerStateChange);

    // Connect to the player!
    let connected = await player.connect();

    if (connected) {
      console.log("sdk is connected");
    }
  })();
};
