import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

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


  if (auth?.loading || !auth?.LoginData ) {
   
    
    return null;
  }

  if (!auth?.LoginData && !auth?.loading ) {
    console.log('!auth?.LoginData ')
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
};
export default ProtectedRoute;