/** @format */

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
const PrivateRoute = () => {
 
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.user
  );
  console.log(isAuthenticated);
  return isAuthenticated  ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  );
};

export default PrivateRoute;
