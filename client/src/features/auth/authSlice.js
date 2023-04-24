import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userRegister,
  activateUser,
  forgetPassword,
  resetPassword,
} from "./authAction.js";

// initialize userToken from local storage
const userToken = localStorage.getItem("token") ?? null;

const initialState = {
  loading: false,
  userInfo: null,
  logged: userToken ? true : false,
  userToken,
  error: null,
  success: false,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.logged = false;
      state.userToken = null;
      state.userInfo = null;
      state.data = null;
      state.success = null;
      state.loading = false;
    },
    setToken: (state, { payload }) => {
      state.userToken = payload;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.logged = true;
      state.userToken = payload.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user
    [userRegister.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [activateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [activateUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [activateUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [forgetPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [forgetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    },
    [forgetPassword.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
