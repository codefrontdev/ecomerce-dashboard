import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import cartReducer from "../features/cartSlice";
import notificationsReducer from "../features/notificationsSlice";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productSlice";


const rootReducer = combineReducers({
  theme: themeReducer,
  cart: cartReducer,
  notifications: notificationsReducer,
  auth: authReducer,
  products: productsReducer,
});

export default rootReducer;