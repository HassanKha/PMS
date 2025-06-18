import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3003/api/v1/Users";
export const ImageURL = "https://upskilling-egypt.com:3006/"

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const USERS_URLS = {
  LOGIN: `/Login`,
  Verify: `/verify`,
  FORGET_PASS: `/Reset/Request`,
  REGISTER: `/Register`,
  CHANGE_PASS: `/ChangePassword`,
  RESET_PASS: `/Reset`,
  GET_USERS: `/`,
  DELETE_USERS: (ID: Number) => `/Users/${ID}`,
};
