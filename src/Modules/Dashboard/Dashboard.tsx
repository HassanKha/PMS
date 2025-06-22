import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faTasks,
  faProjectDiagram,
  faUserCheck,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import HomeBG from "../../assets/home-bg.png";
import { useContext, useEffect, useState } from "react";
import { axiosInstance, TASKS_URLS } from "../../services/Urls";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import type { TasksCount } from "../../interfaces/TasksCount";
import { AuthContext } from "../../contexts/AuthContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useUsersContext } from "../../contexts/UsersContext";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const { isLoading, activatedCount, notActivatedCount, getAllUsers } =
    useUsersContext();
  const {
    projects: Projects,
    loading: loadingProjects,
    fetchProjects,
  } = useProjectContext();

  useEffect(() => {
    fetchProjects(1000, 1, "");
    if (auth?.LoginData?.roles[0] === "Manager") {
      getAllUsers(1000, 1, "");
    }
    getAllTasks();
  }, []);

  const [TasksCount, setTasksCount] = useState<TasksCount | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const getAllTasks = async () => {
    try {
      let response = await axiosInstance.get(TASKS_URLS.GET_TASKS_COUNT);
      setTasksCount(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingTasks(false);
    }
  };

  console.log(auth?.LoginData?.roles)

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "calc(100vh - 70px)" }}
    >
     
      <div
        className="rounded-4 p-5 mb-5 position-relative overflow-hidden"
        style={{
          backgroundImage: `url(${HomeBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          minHeight: "200px",
        }}
      >
       
        <div className="position-relative" style={{ zIndex: 2 }}>
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "300" }}
          >
            Welcome{" "}
            <span style={{ color: "#ed8936", fontWeight: "400" }}>
              {auth?.LoginData?.userName}
            </span>
          </h1>
          <p
            className="text-white mb-0"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", opacity: 0.9 }}
          >
            You can add project and assign tasks to your team
          </p>
        </div>
      </div>

    
      <div className="row g-4">
      
        <div className="col-lg-6">
        
          <div className="d-flex align-items-start mb-3">
            <div
              className="me-3"
              style={{
                width: "4px",
                height: "60px",
                backgroundColor: "#ed8936",
                borderRadius: "2px",
              }}
            />
            <div>
              <h4 className="mb-2 fw-bold text-dark">Tasks</h4>
              <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                Monitor your project progress, track tasks, and manage your
                workload with ease.
              </p>
            </div>
          </div>

       
          <div className="row g-3">
         
            <div className="col-md-6 col-lg-4">
              <div
                className="card border-0 h-100 dashboard-card"
                style={{
                  background:
                    "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",
                  borderRadius: "16px",
                }}
              >
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "rgba(99, 102, 241, 0.2)",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faChartLine}
                        style={{ color: "#6366f1", fontSize: "20px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-muted mb-1"
                      style={{ fontSize: "0.9rem", fontWeight: "500" }}
                    >
                      Progress
                    </div>
                    <div
                      className="fw-bold"
                      style={{ fontSize: "1.75rem", color: "#1a202c" }}
                    >
                      {loadingTasks ? (
                        <Spinner />
                      ) : (
                        (() => {
                          const done = TasksCount?.done ?? 0;
                          const inProgress = TasksCount?.inProgress ?? 0;
                          const toDo = TasksCount?.toDo ?? 0;
                          const total = done + inProgress + toDo;
                          return total > 0
                            ? ((done / total) * 100).toFixed(2)
                            : "0";
                        })()
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Number */}
            <div className="col-md-6 col-lg-4">
              <div
                className="card border-0 h-100 dashboard-card"
                style={{
                  background:
                    "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                  borderRadius: "16px",
                }}
              >
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "rgba(245, 158, 11, 0.2)",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTasks}
                        style={{ color: "#f59e0b", fontSize: "20px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-muted mb-1"
                      style={{ fontSize: "0.9rem", fontWeight: "500" }}
                    >
                      Tasks Number
                    </div>
                    <div
                      className="fw-bold"
                      style={{ fontSize: "1.75rem", color: "#1a202c" }}
                    >
                      {loadingTasks ? <Spinner /> : TasksCount?.toDo}
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="col-md-6 col-lg-4">
              <div
                className="card border-0 h-100 dashboard-card"
                style={{
                  background:
                    "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
                  borderRadius: "16px",
                }}
              >
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "rgba(236, 72, 153, 0.2)",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faProjectDiagram}
                        style={{ color: "#ec4899", fontSize: "20px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-muted mb-1"
                      style={{ fontSize: "0.9rem", fontWeight: "500" }}
                    >
                      Projects Number
                    </div>
                    <div
                      className="fw-bold"
                      style={{ fontSize: "1.7rem", color: "#1a202c" }}
                    >
                      {loadingProjects ? <Spinner /> : Projects.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {auth?.LoginData?.roles[0] === "Manager" ? (
          <div className="col-lg-6">
           
            <div className="d-flex align-items-start mb-3">
              <div
                className="me-3"
                style={{
                  width: "4px",
                  height: "60px",
                  backgroundColor: "#ed8936",
                  borderRadius: "2px",
                }}
              />
              <div>
                <h4 className="mb-2 fw-bold text-dark">Users</h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                  Track user engagement — monitor active contributors and
                  identify inactive accounts.
                </p>
              </div>
            </div>

            
            <div className="row g-3">
             
              <div className="col-md-6">
                <div
                  className="card border-0 h-100 dashboard-card"
                  style={{
                    background:
                      "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                    borderRadius: "16px",
                  }}
                >
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUserCheck}
                          style={{ color: "#3b82f6", fontSize: "20px" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-muted mb-1"
                        style={{ fontSize: "0.9rem", fontWeight: "500" }}
                      >
                        Active
                      </div>
                      <div
                        className="fw-bold"
                        style={{ fontSize: "1.75rem", color: "#1a202c" }}
                      >
                        {isLoading ? <Spinner /> : activatedCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

           
              <div className="col-md-6">
                <div
                  className="card border-0 h-100 dashboard-card"
                  style={{
                    background:
                      "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                    borderRadius: "16px",
                  }}
                >
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          backgroundColor: "rgba(34, 197, 94, 0.2)",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUserTimes}
                          style={{ color: "#22c55e", fontSize: "20px" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-muted mb-1"
                        style={{ fontSize: "0.9rem", fontWeight: "500" }}
                      >
                        Inactive
                      </div>
                      <div
                        className="fw-bold"
                        style={{ fontSize: "1.75rem", color: "#1a202c" }}
                      >
                        {isLoading ? <Spinner /> : notActivatedCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
