import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import cartReducer from "../features/cartSlice";
import notificationsReducer from "../features/notificationsSlice";


const rootReducer = combineReducers({
    theme: themeReducer,
    cart: cartReducer,
    notifications: notificationsReducer,
})

export default rootReducer;