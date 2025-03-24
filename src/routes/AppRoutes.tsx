/** @format */

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard";
import DashboardRoutes from "./DashboardRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
          <Route path='/login' element={<Login />} />
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='*' element={<DashboardRoutes />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
