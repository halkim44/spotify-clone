import { tokenLocalStorageService } from "../utils/localStorageService";

export const loginUser = (tokenObject) => {
  tokenLocalStorageService.setToken(tokenObject);
};

export const logoutUser = () => {
  tokenLocalStorageService.clearToken();
  document.location.reload();
};
