/* node_modules */
import axios, { InternalAxiosRequestConfig } from "axios";

/* absolute */
import baseURL from "utils/base-url";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token: string | null = localStorage.getItem("token") || null;

  let headers = config.headers ?? {};

  if (token) headers.Authorization = `Bearer ${token}`;

  const newConfig: InternalAxiosRequestConfig = {
    ...config,
    headers,
  };

  return newConfig;
});

const get = async (url: string) => instance.get(url);
const post = (url: string, body?: any) => instance.post(url, body);
const del = (url: string, body?: any) => instance.delete(url, { data: body });

export const axiosInstance = instance;
const request = {
  get,
  post,
  del,
};

export default request;
