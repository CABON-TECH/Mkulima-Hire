import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const FarmerPrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user.role == "farmer" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default FarmerPrivateRoute;
