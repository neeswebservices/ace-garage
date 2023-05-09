import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api/axiosClient";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth.userToken ?? getState().auth?.userInfo?.data?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: "auth/status",
        method: "GET",
      }),
    }),
    login: build.mutation({
      query: ({ username, password }) => ({
        url: "auth/login",
        method: "POST",
        body: { username, password },
      }),
      invalidates: ["getDetails"], // invalidate getDetails query when user logs in
    }),
  }),
});

// export react hooks
export const { useGetDetailsQuery } = authApi;
export const { useLoginMutation } = authApi;
