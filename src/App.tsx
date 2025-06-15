import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./shared/AuthLayout";
import NotFound from "./shared/NotFound";
import Login from "./Modules/Auth/Login";
import Register from "./Modules/Auth/Register";
import ForgetPassword from "./Modules/Auth/ForgetPassword";
import ResetPassword from "./Modules/Auth/ResetPassword";
import Verify from "./Modules/Auth/Verify";
import Dashboard from "./Modules/Dashboard/Dashboard";
import MasterLayout from "./shared/MasterLayout";
import ChangePassword from "./Modules/Auth/ChangePassword";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPassword /> },
        { path: "reset-pass", element: <ResetPassword /> },
        { path: "verify-account", element: <Verify /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "/dashboard",
      element: <MasterLayout />,
      children: [{ index: true, element: <Dashboard /> }],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
