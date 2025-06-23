import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import ProjectProvider from "./contexts/ProjectContext.tsx";
import UsersProvider from "./contexts/UsersContext.tsx";
import { TaskProvider } from "./contexts/TaskContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <ProjectProvider>
        <UsersProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </UsersProvider>
      </ProjectProvider>
    </AuthContextProvider>
  </StrictMode>
);
