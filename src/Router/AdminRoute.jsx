import React from "react";

import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole(); 
  const location = useLocation();
  if (loading || roleLoading) return <Loading />;
  if (!user || role !== "admin") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }
//forbidden page will be added later 
  return children;
};

export default AdminRoute;
