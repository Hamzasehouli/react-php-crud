import { createContext, useState } from "react";

export const AppContext = createContext({
  isLoggedIn: false,
});
export const InitContext = function (props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(false);
  const ctx = {
    isLoggedIn,
    email,
    setEmailVal(val) {
      setEmail(val);
    },
    setLoggin(val) {
      setIsLoggedIn(val);
    },
  };

  return (
    <AppContext.Provider value={ctx}>{props.children}</AppContext.Provider>
  );
};
