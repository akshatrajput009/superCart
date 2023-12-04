import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "./orderSlice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export function Order() {
  const dispatch = useDispatch();
  const params = useParams();

  return (
    <div>
      {" "}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-600 sm:text-5xl">
            Order Successful
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Your Order is Successfully place with ID -
            <span className="text-red-600 font-bold">{params.id}</span> .
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/">
              <p className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Continue Shopping...
              </p>
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
