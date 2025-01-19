import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Check if a token exists in localStorage, and use it to initialize the state
  const storedToken = localStorage.getItem("authToken");
  const [state, setState] = useState(storedToken ? true : false);  // Check if token exists
  const [token, setToken] = useState(storedToken || "");  // Store the actual token

  useEffect(() => {
    // Whenever the token changes, store it in localStorage
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken); // Store the token when the user logs in
    setState(true); // Set the state to true indicating that the user is logged in
  };

  const logout = () => {
    setToken(""); // Clear the token
    setState(false); // Set the state to false indicating that the user is logged out
  };

  const value = { state, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
