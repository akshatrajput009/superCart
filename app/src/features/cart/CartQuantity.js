import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemAsync } from "./cartSlice";
const CartQuantity = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const dispatch = useDispatch();
  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <>
      <input
        className="w-12 pr-0  h-1"
        type="number"
        value={quantity}
        onChange={(e) => {
          handleQuantity(e);
        }}
      ></input>
      <button
        type="button"
        className=" ml-2 mr-2 font-medium text-xs text-indigo-600 hover:text-indigo-500"
        onClick={() => {
          if (quantity > 0)
            dispatch(updateItemAsync({ ...product, quantity: quantity }));
        }}
      >
        Update
      </button>
    </>
  );
};

export default CartQuantity;
