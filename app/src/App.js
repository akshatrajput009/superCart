import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";

import { Home } from "../src/pages/Home";
import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import CartPage from "./pages/CartPage";

import { fetchItemsAsync } from "./features/cart/cartSlice";
import { checkUser } from "./features/auth/authSlice";

import { selectUser } from "./features/auth/authSlice";
import NotFound from "./pages/NotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyordersPage from "./pages/MyordersPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {" "}
        <Protected>
          <Home />
        </Protected>
        <CartPage />
      </>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/orderSuccess/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "/productdetail/:id",
    element: (
      <>
        <Protected>
          <ProductDetailPage />
        </Protected>
        <CartPage />
      </>
    ),
  },
  {
    path: "/myOrders",
    element: (
      <Protected>
        <MyordersPage />
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsAsync(user?.id));
  }, []);
  useEffect(() => {}, []);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
