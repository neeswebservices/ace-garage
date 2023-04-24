import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "./userActions";

const token = localStorage.getItem("token") ?? null;

const initialState = {
  id: null,
  username: "",
  loading: false,
  success: false,
  employee: false,
  admin: false,
  role: 0,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      console.log(payload);
      state.employee = payload.employeeAccess || false;
      state.admin = payload.role === 2 ? true : false;
      state.username = payload.username;
      state.role = payload.role;
      state.id = payload._id;
    },
    removeCredentials: (state) => {
      state.employee = false;
      state.admin = false;
      state.username = null;
      state.role = 0;
      state.id = null;
    },
  },
  extraReducers: {
    [setUser.loading]: (state) => {
      state.error = false;
      state.loading = true;
      state.success = false;
    },
    [setUser.fulfilled]: (state, { payload }) => {
      state.error = false;
      state.loading = false;
      state.success = false;
      state.employee = payload.employeeAccess || false;
      state.admin = payload.role === 3 ? true : false;
      state.role = payload.role;
    },
    [setUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.success = false;
    },
  },
});

export const { setCredentials, removeCredentials } = userSlice.actions;

export default userSlice.reducer;
