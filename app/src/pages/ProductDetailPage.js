import React from "react";
import { Navbar } from "../features/navbar/Navbar";

import { ProductDetails } from "../features/product/components/ProductDetails";

export const ProductDetailPage = () => {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
    </div>
  );
};
