import axiosClient from "./axiosClient.js";

const authAPI = {
  signup: (params) => axiosClient.post("auth/register", params),
  login: (params) => axiosClient.post("auth/login", params),
  check: (params) => axiosClient.get("auth/status", params),
};

export default authAPI;
