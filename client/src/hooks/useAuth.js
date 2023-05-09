import { useQuery } from "@tanstack/react-query";
import authAPI from "../api/authApi.js";
import axios from "../../node_modules/axios/index.js";
import { baseURL, getToken } from "../api/axiosClient.js";

const useAuth = () => {
  const { data } = useQuery(["status"], () =>
    axios.get(`${baseURL}/auth/status`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
        withCredentials: true,
      },
    })
  );
  return data;
};

export default useAuth;
