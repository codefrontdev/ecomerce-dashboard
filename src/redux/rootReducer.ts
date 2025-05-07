import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import cartReducer from "../features/cartSlice";
import notificationsReducer from "../features/notificationsSlice";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productSlice";
import categoriesReducer from "../features/categoriesSlice";
import brandsReducer from "../features/brandsSlice";
import analyticsReducer from "../features/analyticsSlice";
import ordersReducer from "../features/ordersSlice";
import userReducer from "../features/usersSlice";


const rootReducer = combineReducers({
  theme: themeReducer,
  cart: cartReducer,
  notifications: notificationsReducer,
  auth: authReducer,
  products: productsReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  analytics: analyticsReducer,
  orders: ordersReducer,
  users: userReducer
});

export default rootReducer;