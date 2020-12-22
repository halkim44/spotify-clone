export const tokenLocalStorageService = (function () {
  function _setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj.access_token);
    localStorage.setItem("refresh_token", tokenObj.refresh_token);
  }
  function _setAccessToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj.access_token);
    window.location.reload();
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return {
    setToken: _setToken,
    setAccessToken: _setAccessToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();

export const searchHistoryLocalStorageService = (function () {
  function _getSearchHistory(userId) {
    const data = JSON.parse(
      localStorage.getItem(`${userId}:fusionSearchHistory`)
    );
    if (!data) {
      return [];
    }
    return data;
  }
  function _addItemToHistory(userId, data) {
    const oldData = _getSearchHistory(userId);
    oldData.forEach((obj, i) => {
      console.log(obj.id);
      if (obj.id === data.id) {
        oldData.splice(i, 1);
        return;
      }
    });

    while (oldData.length > 29) {
      oldData.pop();
    }
    localStorage.setItem(
      `${userId}:fusionSearchHistory`,
      JSON.stringify([data, ...oldData])
    );
  }
  function _clearSearchHistory(userId) {
    localStorage.removeItem(`${userId}:fusionSearchHistory`);
  }
  return {
    getSearchHistory: _getSearchHistory,
    addItemToHistory: _addItemToHistory,
    clearSearchHistory: _clearSearchHistory,
  };
})();
export const volumeLocalStorageService = (function () {
  function _getVolume(userId) {
    const data = localStorage.getItem(`${userId}:volumePercentage`);
    if (!data) {
      return "100";
    }
    return data;
  }
  function _setVolume(userId, volume) {
    localStorage.setItem(`${userId}:volumePercentage`, volume + "");
  }
  return {
    getVolume: _getVolume,
    setVolume: _setVolume,
  };
})();
