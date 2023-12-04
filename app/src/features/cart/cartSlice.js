import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteProduct,
  deleteWholeCart,
  fetchCart,
  updateItem,
} from "./cartAPI";
import { fetchItems } from "./cartAPI";

const initialState = {
  open: false,
  status: "idle",
  items: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (product) => {
    const response = await fetchCart(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsAsync = createAsyncThunk(
  "cart/fetchItems",
  async (id) => {
    const response = await fetchItems(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "cart/deleteProduct",
  async ({ productId }) => {
    const response = await deleteProduct(productId);
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data, "responseCart", productId);
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  "cart/updateItem",
  async (product) => {
    const response = await updateItem(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteWholeCartAsync = createAsyncThunk(
  "cart/deleteWholeCart",
  async (userId) => {
    console.log("wth");
    const response = await deleteWholeCart(userId);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    cartView: (state, action) => {
      console.log(state.open);
      state.open = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        let index = state.items.findIndex((el) => {
          return el.id === action.payload;
        });

        if (index > -1) {
          state.items.splice(index, 1);
        }
        console.log(state.items, index, action.payload);
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";

        let index = state.items.findIndex((el) => {
          return el.id === action.payload.id;
        });

        if (index > -1) {
          state.items[index] = action.payload;
        }
        console.log(state.items, index, action.payload);
      })
      .addCase(deleteWholeCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWholeCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { cartView } = cartSlice.actions;

export const selectOpen = (state) => state.cart.open;

export const selectCart = (state) => state.cart.items;

export default cartSlice.reducer;
