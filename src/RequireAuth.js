import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  console.log("RequireAuth called, auth:", auth);
  console.log("Allowed roles:", allowedRoles);

  // Kiểm tra xem có đang được xác thực hay không
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Kiểm tra quyền truy cập
  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    console.log("No access for role:", auth.user.role);
    return <Navigate to="/no-access" />;
  }

  console.log("Rendering child component");
  return <Outlet />;
};

export default RequireAuth;
