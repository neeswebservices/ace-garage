import getClient from "./getClient.js";

const getAPI = {
  getCategory: (params) => getClient.get("get/category", params),
  getUsers: (params) => getClient.get("admin/users", params),
  getBranches: (params) => getClient.get("get/branch", params),
  getEmployee: (params) => getClient.get("admin/employees", params),
  getSpare: (params) => getClient.get("get/spare", params),
  getService: (params) => getClient.get("get/service", params),
  getAppointments: (params) => getClient.get("get/appointments", params),
  acceptAppointment: (params) => getClient.post("get/appointment", params),
  deleteAppointment: (params) =>
    getClient.post("get/appointment/delete", params),
  deleteCategory: (params) => getClient.post("get/category/delete", params),
  searched: (params) => getClient.post(`get/searched`, params),
  getSingleService: (params) => getClient.post("get/singleservice", params),
  getSingleSpare: (params) => getClient.get("get/singlespare", params),
  addToCart: (params) => getClient.post("cart", params),
  removeFromCart: (params) => getClient.post("cart/remove", params),
  getCarts: (params) => getClient.get("cart", params),
};

export default getAPI;
