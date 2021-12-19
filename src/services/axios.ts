import axios, { AxiosInstance } from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_HOST_NAME,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
