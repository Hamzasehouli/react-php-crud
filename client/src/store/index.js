import { createContext } from "react";

const state = {
  isLoggedIn: false,
  token: "",
};

export const AppContext = createContext(state);

export const IniContext = function (props) {
  const ctx = {
    isLoggedIn: false,
    token: "",
  };
  return (
    <AppContext.Provider value={ctx}> {props.children}</AppContext.Provider>
  );
};
