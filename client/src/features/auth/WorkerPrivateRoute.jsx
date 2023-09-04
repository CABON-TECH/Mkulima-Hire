import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const WorkerPrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user.role == "worker" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default WorkerPrivateRoute;
