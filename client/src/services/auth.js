import LocalStorageService from "./localStorageService";

export const loginUser = (tokenObject) => {
  LocalStorageService.setToken(tokenObject);
};

export const logoutUser = () => {
  LocalStorageService.clearToken();
  document.location.reload();
};
