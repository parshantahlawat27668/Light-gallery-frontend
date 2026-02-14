import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const user = useSelector((store) => store.user.activeUser);

  if (user) {
    return <Navigate to="/shop" replace />;
  }

  return children;
};

export default PublicRoute;
