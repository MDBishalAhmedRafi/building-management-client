// src/Provider/RoleRoute.jsx
import { Navigate, Outlet } from "react-router";
import Loading from "../Main_Layout_Pages/Loading/Loading";
import useRole from "../Hooks/UserRole/useRole";
import useAuth from "../Hooks/UseAuth/UseAuth";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading: userLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  if(userLoading) return <Loading></Loading>
  if (roleLoading) return <Loading />;

  if (user && allowedRoles.includes(role)) return children;

  return <Navigate to="/" replace />;
};

export default RoleRoute;