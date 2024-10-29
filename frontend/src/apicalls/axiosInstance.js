import axios from "axios";

const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}/api`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
