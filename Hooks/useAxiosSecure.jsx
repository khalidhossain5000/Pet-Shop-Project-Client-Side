import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  // baseURL: `http://localhost:3000`,
  baseURL: `https://pet-shop-project-server-side.vercel.app`,
});

const useAxiosSecure = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) return
  axiosSecure.interceptors.request.use((config) => {
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  }),
    (error) => {
      return Promise.reject(error);
    };

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error?.response?.status;
      if (status === 403) {
        navigate("/forbidden");
      }

      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;























