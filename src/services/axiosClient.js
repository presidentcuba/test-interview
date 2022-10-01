import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: "http://streaming.nexlesoft.com:4000/api",
  paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
});
axiosClient.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      config.headers.Authorization = userInfo.token;
      // Bearer
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401) {
    }
    if (error.status === 500) {
    }
    if (error.status === 400) {
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
