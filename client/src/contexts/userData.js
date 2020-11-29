import React, { useReducer, useContext } from "react";

const UserDataContext = React.createContext();
const UserDataDispatchContext = React.createContext();

const UserDataReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGGED_IN": {
      return { data: action.payload };
    }
    case "USER_LOGGED_OUT": {
      return { data: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const UserDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserDataReducer, { data: null });

  return (
    <UserDataContext.Provider value={state}>
      <UserDataDispatchContext.Provider value={dispatch}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  );
};

export const useUserDataState = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserDataState must be used within a Provider");
  }
  return context;
};

export const useUserDataDispatch = () => {
  const context = useContext(UserDataDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDataDispatch must be used within a Provider");
  }
  return context;
};
