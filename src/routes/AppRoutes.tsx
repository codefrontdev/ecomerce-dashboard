/** @format */

import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard";
import DashboardRoutes from "./DashboardRoutes";
import SignIn from "../pages/signIn";

const AppRoutes = () => {
  console.log("AppRoutes");
  return (
    <Routes>
      {/* مسار تسجيل الدخول */}
      <Route
        path='/sign-in'
        element={
            <SignIn />
        }
      />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='*' element={<DashboardRoutes />} />
          </Route>
        </Route>
      {/* مسار افتراضي */}
      <Route path='*' element={<Navigate to='/sign-in' replace />} />
    </Routes>
  );
};

export default AppRoutes;
