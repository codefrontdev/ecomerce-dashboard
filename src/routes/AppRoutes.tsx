/** @format */

import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard";
import DashboardRoutes from "./DashboardRoutes";
import SignIn from "../pages/signIn";
import { useEffect } from "react";
import { myAccount } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const AppRoutes = () => {
  console.log("AppRoutes");
  const dispatch: AppDispatch = useDispatch();
  
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.user
  );
  useEffect(() => {
    dispatch(myAccount());
    console.log("isAuthenticated", isAuthenticated);
  }, [dispatch]);
  return (
    <Routes>
      {/* مسار تسجيل الدخول */}
      <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/" /> : <SignIn />} />
      <Route element={isAuthenticated ? <PrivateRoute /> : <Navigate to="/sign-in" />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<DashboardRoutes />} />
        </Route>
      </Route>
      {/* مسار افتراضي */}
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
};

export default AppRoutes;
