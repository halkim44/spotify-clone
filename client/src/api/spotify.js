import axios from "axios";
import LocalStorageService from "../services/localStorageService";

export const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Accept: "application/json",
  },
});
spotifyApi.interceptors.request.use(
  (config) => {
    config.headers.common["Content-Type"] = "application/json";

    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers.common["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

spotifyApi.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    if (err.response) {
      if (
        err.response.status === 401 &&
        !originalRequest._retry &&
        err.message !== "Network Error"
      ) {
        originalRequest._retry = true;
        const refreshToken = LocalStorageService.getRefreshToken();
        await axios
          .get("/auth/refresh_token", {
            params: { refresh_token: refreshToken },
          })
          .then((res) => {
            if (res.status === 200) {
              LocalStorageService.setAccessToken(res.data);
            }
          })
          .catch((err) => console.log(err));
        return spotifyApi(originalRequest);
      }
    }
    return Promise.reject(err);
  }
);
