import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5001/api" // local dev
    : import.meta.env.VITE_BACKEND_URL + "/api", // deployed backend
  withCredentials: true,
});
