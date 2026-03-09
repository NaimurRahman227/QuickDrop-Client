import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleProtectedRoute = ({ children, role }) => {

  // 🔹 CHANGED: get token instead of user
  const token = localStorage.getItem("token");

  // 🔹 if no token → not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {

    //  decode token to get user role
    const decoded = jwtDecode(token);

    //  role check
    if (decoded.role !== role) {
      return <Navigate to="/" />;
    }

    return children;

  } catch (err) {

    //  invalid token
    return <Navigate to="/login" />;
  }
};

export default RoleProtectedRoute;