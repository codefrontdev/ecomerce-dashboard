/** @format */

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = {
    role: "admin",
  };

  
  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
