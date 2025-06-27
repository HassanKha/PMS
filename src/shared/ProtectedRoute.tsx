import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LoadingPage from "./LoadingPage/LoadingPage";
interface ProtectedRouteProps {
  children?: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth?.SaveLoginData();
    } 
  }, [location.pathname]);
  
  if ( auth?.loading  ) {
    return <LoadingPage />;
  }


  if(auth?.LoginData && auth.LoginData.roles[0] !== 'Manager' && (location.pathname === '/dashboard/users' || location.pathname === '/dashboard/tasks-data'))
  {
    return <Navigate to="/login" />;
  }

  return children ?? <Outlet />;
};
export default ProtectedRoute;