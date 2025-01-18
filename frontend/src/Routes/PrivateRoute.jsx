import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; // Use Navigate instead of Redirect
import { AuthContext } from "../Components/Context/Auth"; // Import AuthContext

const PrivateRoute = ({ children }) => {
  const { state } = useContext(AuthContext); // Get the auth state

  if (!state) {
    return <Navigate to="/login" />; // Redirect to login page if user is not logged in
  }

  return children; // Render the children (i.e., Homepage) if user is authenticated
};

export default PrivateRoute;
