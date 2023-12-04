import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import productsReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    user: userReducer,
  },
});
