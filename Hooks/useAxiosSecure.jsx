import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import Loading from "../src/Shared/Loading/Loading";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  const { user ,loading} = useAuth();
  if(loading) return <Loading/>

  axiosSecure.interceptors.request.use((config) => {
     if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
  }),
    (error) => {
      return Promise.reject(error);
    };
      return axiosSecure;
};

export default useAxiosSecure;
