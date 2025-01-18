import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(false);
  const login = () => {
    setState(true);
  };
  const logout = () => {
    setState(false);
  };
  const value = { state, setState, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
