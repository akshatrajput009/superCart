import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount, fetchUserOrders } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrders",
  async (id) => {
    const response = await fetchUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data, "orderResp");
    return response.data;
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export default UserSlice.reducer;
