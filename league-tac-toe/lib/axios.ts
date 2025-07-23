import axios from "axios";
import { getUserUid } from "./utils";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserUid()}`,
    },
});

export default axiosInstance;
