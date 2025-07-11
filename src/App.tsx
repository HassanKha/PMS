import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./shared/AuthLayout";
import NotFound from "./shared/NotFound";
import Login from "./Modules/Auth/Login";
import Register from "./Modules/Auth/Register";
import ForgetPassword from "./Modules/Auth/ForgetPassword";
import Verify from "./Modules/Auth/Verify";
const Dashboard = React.lazy(() => import  ("./Modules/Dashboard/Dashboard"));
import MasterLayout from "./shared/MasterLayout";
import ChangePassword from "./Modules/Auth/ChangePassword";
import ProjectData from "./Modules/Projects/ProjectData";
import ProjectList from "./Modules/Projects/ProjectList";
import Users from "./Modules/Users/Users";
import ProtectedRoute from "./shared/ProtectedRoute";
import Profile from "./Modules/Profile/Profile";
import ProtectedTasksRoute from "./shared/ProtectedTasksRoute";
import TasksData from "./Modules/Tasks/TasksData";

import LoadingPage from "./shared/LoadingPage/LoadingPage";



function App() {

  const routes: RouteObject[] = [
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verify-account", element: <Verify /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute><MasterLayout /></ProtectedRoute>,
      children: [
        { index: true, element: <Suspense fallback={<LoadingPage />}> <Dashboard /> </Suspense> },
        { path: "projects", element: <ProjectList /> },
        { path: "project-data", element: <ProjectData /> },
        { path: "users", element: <Users /> },
        { path: "tasks", element: <ProtectedTasksRoute /> },
        { path: "tasks-data", element: <TasksData /> },
        { path: "profile", element: <Profile /> },

      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

 

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
}

export default App;
