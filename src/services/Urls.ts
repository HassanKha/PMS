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
  UPDATE_CURRENT_PROFILE:`/Users/`,
  GET_LOGGED_IN_USERS: `/Users/`,
  GET_CURRENT_USER:`/Users/currentUser`,

  DELETE_USERS: (ID: Number) => `/Users/${ID}`,
  GET_SPECIFIC_USER: (ID: Number) => `/Users/${ID}`,
  TOGGLE_ACTIVATED_EMPLOYEE: (ID: Number) => `/Users/${ID}`
};

export const PROJECTS_URLS = {
  GET_PROJECTS: (role: string) =>  `/Project/${role === 'Manager' ? 'manager' : 'employee'}`,
  ADD_PROJECT: `/Project`,
  GET_SPECIFIC_PROJECT: (ID: Number) => `/Project/${ID}`,
  EDIT_PROJECT: (ID: Number) => `/Project/${ID}`,
  DELETE_PROJECT: (ID: Number) => `/Project/${ID}`,
};

export const TASKS_URLS = {
  GET_TASKS_COUNT: `/Task/count`,
  GET_TASKS_MANAGER: `/Task/manager`,
  DELETE_TASK_BY_MANAGER:(ID:Number)=>`/Task/${ID}`,
   GET_ASSIGNED_TASKS: `/Task`,
  UPDATE_ASSIGNED_TASK: (ID: Number) => `/Task/${ID}/change-status`,
  EDIT_TASK : (ID: Number) => `/Task/${ID}`,
    Add_TASK : `/Task/`
}