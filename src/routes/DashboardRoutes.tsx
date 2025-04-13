/** @format */

import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/notFound";
import Cart from "../pages/cart";
import CreateProduct from "../pages/products/CreateProduct";
import Product from "../pages/products/Product";
import OrdersPage from "../pages/orders";
import OrderDetails from "../pages/orders/Order";
import SalesPage from "../pages/sales";
import Invoice from "../pages/orders/invoice";
import ReviewsPage from "../pages/reviews";
import SettingsPage from "../pages/settings";
import ChatPage from "../pages/chat";
import CustomersPage from "../pages/customers";
import CreateCustomers from "../pages/customers/CreateCustomers";
import CustomerDetails from "../pages/customers/CustomerDetails";
import ProductsView from "../pages/products/ProductsView";

const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='orders' element={<OrdersPage />} />
        <Route path='cart' element={<Cart />} />
        <Route path='products' element={<ProductsView />} />
        <Route path='products/:id/details' element={<Product />} />
        <Route path='products/:id/edit' element={<Product />} />
        <Route path='products/create-product' element={<CreateProduct />} />
        <Route path='orders/:id/details' element={<OrderDetails />} />
        <Route path='orders/:id/invoice' element={<Invoice />} />
        <Route path='customers' element={<CustomersPage />} />
        <Route path='customers/create-customer' element={<CreateCustomers />} />
        <Route path='customers/:id/details' element={<CustomerDetails />} />
        <Route path='chats' element={<ChatPage />} />
        <Route path='sales' element={<SalesPage />} />
        <Route path='reviews' element={<ReviewsPage />} />
        <Route path='settings' element={<SettingsPage />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default DashboardRoutes;
