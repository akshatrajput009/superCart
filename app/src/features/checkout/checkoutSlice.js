import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAddress } from "./checkoutAPI";

const initialState = {
  address: [],
  status: "idle",
};

export const fetchAddressAsync = createAsyncThunk(
  "checkout/fetchAddress",
  async (product) => {
    const response = await fetchAddress(product);

    return response.data;
  }
);

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.address.push(action.payload);
      });
  },
});

export const selectAddress = (state) => state.checkout.address;

export default checkoutSlice.reducer;
