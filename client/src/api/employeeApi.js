import axiosClient from "./axiosClient.js";
// import getAPI from "./getApi";

const employeeAPI = {
  createSpare: (params) => axiosClient.post("spare", params),
};

export default employeeAPI;
