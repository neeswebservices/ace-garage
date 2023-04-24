import axiosClient from "./axiosClient.js";

const adminAPI = {
  createCategory: (params) => axiosClient.post("admin/category", params),
  createBranch: (params) => axiosClient.post("admin/branch", params),
  getCategory: (params) => axiosClient.get("get/category", params),
  getUsers: (params) => axiosClient.get("get/users", params),
};

export default adminAPI;
