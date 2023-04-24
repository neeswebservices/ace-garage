import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import authAPI from "../api/authApi.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../hooks/authHooks";
import Spinner from "../components/common/Spinner";
import Loading from "../components/common/Loading";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../features/auth/authAction";
import { useLoginMutation } from "../app/services/authService";
import { invalidateQueries } from "react-query";
import { toast } from "react-toastify";

export const Login = ({}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  // const submitForm = async (data) => {
  //   // const { data: response, isLoading } = useQuery(["auth"], authAPI.login(data));
  //   // const res = await authAPI.login({ ...data });
  //   await mutate({ ...data });
  //   reset();
  //   navigate("/");
  // };
  const { loading, logged, success, userInfo, error } = useSelector(
    (state) => state.auth
  );
  const { userToken } = useSelector((state) => state.auth);

  // const { data: details, isFetching } = useGetDetailsQuery('userDetails', {
  //     pollingInterval: 900000,
  // });

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (logged) navigate("/");
  }, [navigate, logged]);

  const submitForm = (data) => {
    dispatch(userLogin(data));

    if (logged) {
      reset();
      navigate("/");
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover object-top"
              src="https://plus.unsplash.com/premium_photo-1661900991997-81d451f37c15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
              Login
            </h2>

            <form onSubmit={handleSubmit(submitForm)} className="mt-2">
              {loading ? <Spinner /> : null}

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900 dark:text-gray-200"
                  >
                    {" "}
                    Username{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      placeholder="Enter Your Username"
                      id="username"
                      {...register("emailorusername")}
                    ></input>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900 dark:text-gray-200"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="password"
                      placeholder="Enter Your Password"
                      id="password"
                      {...register("password")}
                    ></input>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                  >
                    Login Here
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-2 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
              Didn't Have an account?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
