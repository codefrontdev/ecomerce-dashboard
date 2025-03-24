/** @format */

import { Route, Routes } from "react-router-dom";
import Orders from "../pages/orders";
import NotFound from "../pages/notFound";
import Cart from "../pages/cart";
import ProductsPage from "../pages/products";

const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='orders' element={<Orders />} />
        <Route path='cart' element={<Cart />} />
        <Route path='products' element={<ProductsPage />} />

        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default DashboardRoutes;
