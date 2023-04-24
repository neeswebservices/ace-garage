import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";

export const baseURL = "http://192.168.3.113:8000/api/v1";
export const getToken = () => localStorage?.getItem("token");

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
      withCredentials: true,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      toast.success(response.data?.message);
      return response.data;
    }
    console.log(response);
    return response.data;
  },
  (err) => {
    if (err.response) {
      //   return alert(err);
      // console.log(err.response.data.message);
      toast.error(err.response.data.message);
      return err.response.data;
    }
    return err;
  }
);

export default axiosClient;
