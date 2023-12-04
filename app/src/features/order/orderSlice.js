import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderAPI";

const initialState = {
  order: [],
  status: "idle",
  currentOrder: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const addOrderAsync = createAsyncThunk(
  "counter/addOrder",
  async (order) => {
    const response = await addOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;
export const selectOrder = (state) => state.orders.order;
export const selectCurrentOrder = (state) => state.orders.currentOrder;

export default orderSlice.reducer;
