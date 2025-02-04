import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Homepage from "../Components/Homepage";
import PrivateRoute from "./PrivateRoute";
import Videos from "../Components/Videos";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/videos" element={<Videos/>}/>
    </Routes>
  );
};

export default AllRoutes;
