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
};

export default getAPI;
