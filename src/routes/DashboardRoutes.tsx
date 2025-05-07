/** @format */

import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/notFound";
import Cart from "../pages/cart";
import CreateProduct from "../pages/products/CreateProduct";
import OrdersPage from "../pages/orders";
import SalesPage from "../pages/sales";
import Invoice from "../pages/orders/invoice";
import ReviewsPage from "../pages/reviews";
import SettingsPage from "../pages/settings";
import ChatPage from "../pages/chat";
import CustomersPage from "../pages/customers";
import CreateCustomers from "../pages/customers/CreateCustomers";
import CustomerDetails from "../pages/customers/CustomerDetails";
import ProductsView from "../pages/products/ProductsView";
import Product from "../pages/products/product";
import OrderDetails from "../pages/orders/order";
import CategoriesView from "../pages/categories/CategoryView";
import CreateCategory from "../pages/categories/CreateCategory";
import Category from "../pages/categories/Category";
import BrandsView from "../pages/brands/BrandsView";
import Brand from "../pages/brands/Brand";
import CreateBrand from "../pages/brands/CreateBrand";
import { CreateOrderPage } from "../pages/orders/createOrder";

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
        <Route path='categories' element={<CategoriesView />} />
        <Route path='categories/:id/details' element={<Category />} />
        <Route path='categories/:id/edit' element={<CreateCategory  />} />
        <Route path='categories/create-category' element={<CreateCategory />} />
        <Route path='brands' element={<BrandsView />} />
        <Route path='brands/:id/details' element={<Brand />} />
        <Route path='brands/:id/edit' element={<CreateBrand  />} />
        <Route path='brands/create-brand' element={<CreateBrand />} />
        <Route path='orders/:id/details' element={<OrderDetails />} />
        <Route path='orders/:id/invoice' element={<Invoice />} />
        <Route path='orders/create-order' element={<CreateOrderPage />} />

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
