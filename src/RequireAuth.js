import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/no-access" />;
  }

  return <Outlet />;
};

export default RequireAuth;
