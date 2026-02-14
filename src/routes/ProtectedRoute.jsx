import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store)=>store.user.activeUser);
  if(user){
    return children
  } 
  return <Navigate to="/auth/login"/>
};

export default ProtectedRoute;

