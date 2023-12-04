import React, { useEffect } from "react";
import { Order } from "../features/order/Order";
import { useDispatch, useSelector } from "react-redux";
import { deleteWholeCartAsync } from "../features/cart/cartSlice";
import { selectUser } from "../features/auth/authSlice";
import { resetCurrentOrder } from "../features/order/orderSlice";

const OrderSuccessPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteWholeCartAsync(user.id));
    dispatch(resetCurrentOrder());
  }, []);
  return <Order />;
};

export default OrderSuccessPage;
