import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../auth/authSlice";
import { fetchUserOrdersAsync, selectUserOrders } from "./userSlice";

export function UserStore() {
  const userOrders = useSelector(selectUserOrders);
  const user = JSON.parse(window.localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user.id));
  }, [dispatch]);
  console.log(userOrders, "userOrders");

  return (
    <div className="mt-8">
      {userOrders?.map((order) => (
        <div className="mx-0 sm:mx-auto mt-8 max-w-7xl px-0 sm:px-6 lg:px-2 bg-white">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-2xl mb-6 font-bold tracking-tight text-gray-900">
              Order Id #{order.id}
            </h1>
            <div>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order?.products?.map((product) => (
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
                          <div className="flex flex-col sm:flex-row justify-between text-base font-medium text-gray-900">
                            <h3>
                              <p>{product.title}</p>
                            </h3>
                            <p className="ml-4">${product.price}</p>
                          </div>
                          {/* <p className="mt-1 text-sm text-gray-500">
                                  {product.color}
                                </p> */}
                        </div>
                        <div className="flex flex-col sm:flex-row  flex-1 items-end justify-between text-sm">
                          <div className="flex items-center">
                            {" "}
                            <p className="text-gray-500 mr-3">
                              {product.quantity}
                            </p>
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
              <p>Subtotal</p>
              <p>${order.subTotal}</p>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Shipping Address
            </h2>
            <div className="border-gray-200 border-2 p-3 mt-1">
              <div className="flex min-w-0 gap-x-4 ">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.address.streetAddress}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.address.region}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {order.address.pincode}
                </p>

                <p className="text-sm leading-6 text-gray-900">
                  {order.address.city}
                </p>
              </div>

              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {order.address.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
