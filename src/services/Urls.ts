import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3003/api/v1";
export const ImageURL = "https://upskilling-egypt.com:3003/"

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
  LOGIN: `/Users/Login`,
  Verify: `/Users/verify`,
  FORGET_PASS: `/Users/Reset/Request`,
  REGISTER: `/Users/Register`,
  CHANGE_PASS: `/Users/ChangePassword`,
  RESET_PASS: `/Users/Reset`,
  GET_LOGGED_IN_USERS: `/Users/`,
  DELETE_USERS: (ID: Number) => `/Users/${ID}`,
  GET_SPECIFIC_USER: (ID: Number) => `/Users/${ID}`,
  TOGGLE_ACTIVATED_EMPLOYEE:(ID:Number)=>`/Users/${ID}`
};
