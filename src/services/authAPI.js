import axiosClient from "./axiosClient";

const authAPI = {
  login: (values) => {
    return axiosClient.post("/auth/signin", values);
  },

  register: (values) => {
    return axiosClient.post("/auth/signup", values);
  },

  logout: () => {
    return axiosClient.post("/auth/logout");
  },
};

export default authAPI;
