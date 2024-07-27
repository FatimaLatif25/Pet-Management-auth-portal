import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      console.log("token decode failed", error);
      return false;
    }
  }
};

const privateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};
export default privateRoutes;
