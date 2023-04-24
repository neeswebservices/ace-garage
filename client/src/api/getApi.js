import getClient from "./getClient.js";

const getAPI = {
  getCategory: (params) => getClient.get("get/category", params),
  getUsers: (params) => getClient.get("admin/users", params),
  getBranches: (params) => getClient.get("get/branch", params),
};

export default getAPI;
