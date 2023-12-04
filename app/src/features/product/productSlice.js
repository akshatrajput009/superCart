import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchBrands,
  fetchCategories,
  fetchFilteredProducts,
  fetchProductDetails,
} from "./productAPI";

const initialState = {
  product: [],
  totalItems: [],
  categories: [],
  brands: [],
  productDetails: [],
  status: "idle",
};

export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetchCategories();

    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const response = await fetchBrands();

    return response.data;
  }
);

export const fetchFilteredProductsAsync = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (filter) => {
    const response = await fetchFilteredProducts(filter);

    return response.data;
  }
);

export const fetchProductDetailsAsync = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await fetchProductDetails(id);

    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchFilteredProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetailsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.productDetails = action.payload;
      });
  },
});

export const selectProduct = (state) => state.products.product;
export const selectTotalItems = (state) => state.products.totalItems;
export const selectCategories = (state) => state.products.categories;
export const selectBrands = (state) => state.products.brands;
export const selectProductDetails = (state) => state.products.productDetails;
export default productSlice.reducer;
