import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../components/shared/Hooks/UseAuth";
import Loader from "../components/shared/Loader/Loader";
import UseAdmin from "../components/shared/Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  const [isAdmin, isAdminLoading] = UseAdmin();
  if (loading || isAdminLoading) {
    return <Loader />;
  } else if (user && isAdmin) {
    return children;
  }
  return <Navigate state={{ from: location }} replace to="/login"></Navigate>;
};

export default AdminRoute;
