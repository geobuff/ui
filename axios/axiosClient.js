import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
  };

  return config;
});

export default axiosClient;
