import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../api/axiosClient";

export const setUser = createAsyncThunk(
  "user/get",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/auth/user`, config);

      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.msg) {
        rejectWithValue(error.response.data.msg);
      } else if (error.response && error.response.data.message) {
        rejectWithValue(error.response.data.message);
      } else {
        rejectWithValue(error.response);
      }
    }
  }
);
