import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://pet-shop-project-server-side.vercel.app`
    // baseURL: `http://localhost:3000`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;