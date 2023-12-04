import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cartView,
  deleteProductAsync,
  selectCart,
  selectOpen,
} from "./cartSlice";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { checkUser, selectUser } from "../auth/authSlice";
import { fetchItemsAsync } from "./cartSlice";
import CartQuantity from "./CartQuantity";
import { Link } from "react-router-dom";

export function Cart() {
  const [quantity, setQuantity] = useState(0);
  const setOpen = useSelector(selectOpen);
  const items = useSelector(selectCart);
  const user = useSelector(selectUser);
  const products = [...items];
  console.log(items, "items");
  const dispatch = useDispatch();

  const [subTotal, setSubTotal] = useState(0);

  const calTotal = () => {
    let total = 0;
    products?.map((el) => {
      total += +el.price * +el.quantity;
    });

    setSubTotal(total);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    calTotal();
  }, [products]);

  return (
    <Transition.Root show={setOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(cartView(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div
                    className="flex h-full flex-col overflow-y-scroll  shadow-xl"
                    style={{ backgroundColor: "#f4ebe0" }}
                  >
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => dispatch(cartView(false))}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products?.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p>{product.title}</p>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center">
                                      {" "}
                                      <p className="text-gray-500 mr-3">Qty</p>
                                      {/* <input
                                        className="w-12 pr-0  h-1"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => {
                                          handleQuantity(e);
                                        }}
                                      ></input> */}
                                      <CartQuantity product={product} />
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => {
                                          console.log(product, product.id);
                                          dispatch(
                                            deleteProductAsync({
                                              productId: product.id,
                                            })
                                          );
                                          // dispatch(fetchItemsAsync(user.id));
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Sub Total</p>
                        <p>${subTotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link to="/checkout">
                          {" "}
                          <p className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                          </p>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => dispatch(cartView(false))}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
