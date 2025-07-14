// src/Provider/RoleRoute.jsx
import { Navigate, Outlet } from "react-router";
import Loading from "../Main_Layout_Pages/Loading/Loading";
import useRole from "../Hooks/UserRole/useRole";
import useAuth from "../Hooks/UseAuth/UseAuth";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  if (authLoading || roleLoading) return <Loading />;

  if (user && allowedRoles.includes(role)) return children ? children : <Outlet />;

  return <Navigate to="/" replace />;
};

export default RoleRoute;