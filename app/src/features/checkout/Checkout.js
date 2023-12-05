import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAddress } from "./checkoutSlice";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { fetchAddress } from "./checkoutAPI";
import { checkUser, selectUser, updateAddressAsync } from "../auth/authSlice";
import {
  fetchItemsAsync,
  selectCart,
  deleteProductAsync,
} from "../cart/cartSlice";
import CartQuantity from "../cart/CartQuantity";
import { Link, Navigate } from "react-router-dom";
import { addOrderAsync, selectCurrentOrder } from "../order/orderSlice";
export function Checkout() {
  const [defaultAddress, setDefaultAddress] = useState("");
  const [payment, setPayment] = useState("");
  const address = useSelector(selectAddress);
  const user =
    useSelector(selectUser) || JSON.parse(window.localStorage.getItem("user"));
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ ...user, address: [data, ...user.address] }, "upadd data");

    dispatch(updateAddressAsync({ ...user, address: [data, ...user.address] }));
  };

  const handleAddress = (e) => {
    setDefaultAddress(user.address[e.target.value]);
  };

  const handlePayment = (e) => {
    setPayment(e.target.id);
  };

  // cart in checkout

  const items = useSelector(selectCart);

  const products = [...items];

  const [subTotal, setSubTotal] = useState(0);

  const calTotal = () => {
    let total = 0;
    products?.map((el) => {
      total += +el.price * +el.quantity;
    });

    setSubTotal(total);
  };

  useEffect(() => {
    calTotal();
  }, [products]);

  const handleOrder = () => {
    if (!defaultAddress) {
      alert("Please select an address before proceeding.");
      return;
    }

    if (!payment) {
      alert("Please select a payment method before proceeding.");
      return;
    }

    dispatch(
      addOrderAsync({
        products,
        subTotal,
        address: defaultAddress,
        paymentMethod: payment,
        userId: user.id,
      })
    );
  };

  return products.length < 1 ? (
    <Navigate to="/" />
  ) : (
    <>
      {currentOrder && <Navigate to={`/orderSuccess/${currentOrder.id}`} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12 bg-white px-5 py-5 my-8">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-600">
                        {errors.firstName?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-600">{errors.lastName?.message}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-600">
                        {errors.email?.message ||
                          (errors.email?.type === "pattern"
                            ? "Enter a valid email"
                            : "")}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>

                      <p className="text-red-600">{errors.country?.message}</p>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("streetAddress", {
                          required: "Street Address is required",
                        })}
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-600">
                        {errors.streetAddress?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", {
                          required: "City is required",
                        })}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-600">{errors.city?.message}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("region", {
                          required: "State is required",
                        })}
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-600">{errors.region?.message}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        {...register("pinCode", {
                          required: "Pin Code is required",
                        })}
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-600">{errors.pinCode?.message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="reset"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Saved Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose default address
                </p>
                <ul role="list" className="divide-y divide-gray-100">
                  {user.address?.map((person, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <input
                        id={address.id}
                        name="address"
                        type="radio"
                        value={index}
                        onChange={(e) => {
                          handleAddress(e);
                        }}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {person.streetAddress}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {person.region}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {person.pincode}
                        </p>

                        <p className="text-sm leading-6 text-gray-900">
                          {person.city}
                        </p>
                      </div>

                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {person.email}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose one{" "}
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payment"
                          type="radio"
                          onChange={(e) => {
                            handlePayment(e);
                          }}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payment"
                          type="radio"
                          onChange={(e) => {
                            handlePayment(e);
                          }}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
          <div className="mx-0 sm:mx-auto mt-8 max-w-7xl px-0 sm:px-6 lg:px-2 bg-white">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-2xl mb-6 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
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
                              <p className="text-gray-500 mr-3">Qty</p>
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
                                      userId: user.id,
                                      productId: product.id,
                                    })
                                  );
                                  dispatch(fetchItemsAsync(user.id));
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
                <p>Subtotal</p>
                <p>${subTotal}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div
                className="mt-6 cursor-pointer"
                onClick={() => {
                  handleOrder();
                }}
              >
                {" "}
                <p className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Pay and Order
                </p>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
