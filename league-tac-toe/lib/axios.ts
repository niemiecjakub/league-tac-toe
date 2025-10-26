import axios from "axios";
import { getUserUid } from "./utils";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserUid()}`,
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
