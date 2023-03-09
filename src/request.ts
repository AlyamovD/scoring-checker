/* node_modules */
import axios, { InternalAxiosRequestConfig } from "axios";

/* absolute */
import baseURL from "utils/base-url";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "ZF-Api-Key": "f05ac327-41db-46e1-99f4-7bb429b4e459",
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
const put = (url: string, body?: any) => instance.put(url, body);
const del = (url: string) => instance.delete(url);

export const axiosInstance = instance;
const request = {
  get,
  post,
  put,
  del,
};

export default request;
