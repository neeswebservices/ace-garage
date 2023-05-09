import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js";
import authReducer from "../features/auth/authSlice.js";
import { authApi } from "./services/authService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
