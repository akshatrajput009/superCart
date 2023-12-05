import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendSignup, updateAddress } from "./authAPI";
import { sendLogin } from "./authAPI";

const initialState = {
  user: "",
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const sendSignupAsync = createAsyncThunk(
  "auth/sendSignup",
  async (loginData) => {
    const response = await sendSignup(loginData);

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const sendLoginAsync = createAsyncThunk(
  "auth/sendLogin",
  async (sentData) => {
    const response = await sendLogin(sentData);

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "auth/updateAddress",
  async (sentData) => {
    const response = await updateAddress(sentData);

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    checkUser: (state) => {
      state.user = JSON.parse(window.localStorage.getItem("user"));
    },
    setUserNull: (state) => {
      state.user = "";
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendSignupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendSignupAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(sendSignupAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.error, "fgf");
        state.error = action.error.message;
      })
      .addCase(sendLoginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendLoginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = JSON.parse(window.localStorage.getItem("user"));
        console.log(state.user);
      })
      .addCase(sendLoginAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.error, "fgf");
        state.error = action.error.message;
      })
      .addCase(updateAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("updatedaddress");
        state.user = JSON.parse(window.localStorage.getItem("user"));
        console.log(state.user);
      });
  },
});

export const { checkUser, setUserNull } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectUserError = (state) => state.auth.error;
export const selectUserStatus = (state) => state.auth.status;

export default authSlice.reducer;
