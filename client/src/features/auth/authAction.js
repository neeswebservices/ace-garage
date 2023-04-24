import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL as API } from "../../api/axiosClient";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ emailorusername, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API}/auth/login`,
        { emailorusername, password },
        config
      );

      // set to localstorage
      localStorage.setItem("token", data?.data?.token);
      toast.success(data?.data?.message);

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response && error.response.data.token) {
        return rejectWithValue(error.response.data.token);
      } else if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (
    { fullName, username, address, email, password },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API}/auth`,
        { fullName, username, address, email, password },
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.msg);
      }
    }
  }
);

export const activateUser = createAsyncThunk(
  "user/activate",
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log(id + " activate user");
      const { data } = await axios.get(`${API}/auth/activate/${id}`);

      return data;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "user/forget",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/auth/forgot`, { email });
      console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${API}/auth/reset/${token}`, {
        password,
      });
      console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
