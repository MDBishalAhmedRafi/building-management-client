import { Navigate, useLocation } from "react-router";
import Loading from "../Main_Layout_Pages/Loading/Loading"; // Adjust path if needed
import useAuth from "../Hooks/UseAuth/UseAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  // You must assign 'admin' role when user becomes admin (e.g., in DB or context)
  if (user?.role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
