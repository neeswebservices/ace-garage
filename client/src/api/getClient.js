import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";
import { baseURL, getToken } from "./axiosClient.js";

const getClient = axios.create({
  baseURL: baseURL,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

getClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
      withCredentials: true,
    },
  };
});

getClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response.data;
  },
  (err) => {
    if (err.response) {
      //   return alert(err);
      // console.log(err.response.data.message);
      return err.response.data;
    }
    return err.response?.data;
  }
);

export default getClient;
