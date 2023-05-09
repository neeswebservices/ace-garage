import { useMutation } from "@tanstack/react-query";
import authAPI from "../api/authApi";

export function useLogin() {
  return useMutation((credentials) => authAPI.login(credentials), {
    onSuccess: (data, variables) => {
      // handle success here
      console.log(data);
      localStorage.setItem("token ", data?.data?.token);
    },
    onError: (error, variables) => {
      // handle error here
      console.log(error);
    },
  });
}
