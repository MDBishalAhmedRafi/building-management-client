import React from "react";
import { Navigate, useLocation } from "react-router";
import useRole from "../Hooks/UserRole/useRole";
import Loading from "../Main_Layout_Pages/Loading/Loading";
import useAuth from "../Hooks/UseAuth/UseAuth";


const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }

  if (user && role === "user") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default UserRoute;
