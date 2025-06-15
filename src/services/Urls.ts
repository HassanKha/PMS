import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3003/api/v1";
export const ImageURL = "https://upskilling-egypt.com:3006/"

export const axiosInstance = axios.create({
  baseURL,
});

export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  Verify: `/Users/verify`,
  FORGET_PASS: `/Users/Reset/Request`,
  REGISTER: `/Users/Register`,
  CHANGE_PASS: `/Users/ChangePassword`,
  RESET_PASS: `/Users/Reset`,
      GET_USERS: `/Users/`,
    DELETE_USERS: (ID : Number) => `/Users/${ID}`,
};
