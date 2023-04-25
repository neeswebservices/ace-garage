import axiosClient from "./axiosClient.js";
import getAPI from "./getApi";

const adminAPI = {
  createCategory: (params) => axiosClient.post("admin/category", params),
  createBranch: (params) => axiosClient.post("admin/branch", params),
  getCategory: (params) => axiosClient.get("get/category", params),
  getUsers: (params) => axiosClient.get("get/users", params),
  createEmployee: (params) => axiosClient.post("admin/employee", params),
  createUser: (params) => axiosClient.post("admin/user", params),
  createAppointment: (params) => axiosClient.post("spare/announcement", params),
};

export default adminAPI;
