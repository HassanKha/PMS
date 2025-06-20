import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine, faTasks, faProjectDiagram, faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons"
import HomeBG from "../../assets/home-bg.png"
import type { Project } from "../../interfaces/Project"
import { useEffect, useState } from "react"
import { axiosInstance, PROJECTS_URLS, TASKS_URLS, USERS_URLS } from "../../services/Urls"
import { toast } from "react-toastify"
import { Spinner } from "react-bootstrap"
import type { Logged_in_Users } from "../../interfaces/Users"
import type { TasksCount } from "../../interfaces/TasksCount"


export default function Dashboard() {
   const [Projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);


   useEffect(() => {
       getAllProjects();
       GetAllLoggedUsers();
       getAllTasks();
     }, []);

     let [Users,setUsers] = useState<Logged_in_Users[]>([])
     let [isLoading,setIsLoading] = useState<boolean>(false)
     
       const GetAllLoggedUsers = async()=>{
         try{
           setIsLoading(true)
           let response = await axiosInstance.get(USERS_URLS.GET_LOGGED_IN_USERS, {
            params: { pageSize :965 , pageNumber: 1}
          }
            )
           console.log(response.data.data);
           setUsers(response?.data?.data)
           setIsLoading(false)
         }
         catch(error){
           console.log(error);
           setIsLoading(false)
        
         }
       }
     
   
     const getAllProjects = async (
     ) => {
       try {
         setLoading(true);
         let response = await axiosInstance.get(PROJECTS_URLS.GET_PROJECTS, {
         });
         console.log(response);
         const data = response.data.data;
   
         const enhanced = data.map((proj: Project) => ({
           ...proj, // existing properties: id, title, etc.
           numTasks: proj.task.length, // count of tasks
           tasksCount: proj.task, // actual task array (or rename/drop proj.task)
         }));
   
         setProjects(enhanced);
         setLoading(false);
       } catch (error: any) {
         console.log(error);
         toast.error(error.response?.data?.message || "Something went wrong");
       } finally {
         setLoading(false);
       }
     };

const activatedCount = Users?.filter(user => user.isActivated).length
const notActivatedCount = Users?.filter(user => !user.isActivated).length


const [TasksCount, setTasksCount] = useState<TasksCount | null>(null);
const [loadingTasks, setLoadingTasks] = useState(false);

const getAllTasks = async () => {
  try {
    setLoadingTasks(true);
    let response = await axiosInstance.get(TASKS_URLS.GET_TASKS_COUNT);
    console.log(response);
    setTasksCount(response.data);
    setLoadingTasks(false);
  } catch (error: any) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoadingTasks(false);
  }
};
  

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "calc(100vh - 70px)" }}>
      {/* Hero Section */}
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


        {/* Content */}
        <div className="position-relative" style={{ zIndex: 2 }}>
          <h1 className="text-white mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "300" }}>
            Welcome <span style={{ color: "#ed8936", fontWeight: "400" }}>Upskilling</span>
          </h1>
          <p className="text-white mb-0" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", opacity: 0.9 }}>
            You can add project and assign tasks to your team
          </p>
        </div>
      </div>

{/* Stats Section */}
<div className="row g-4">
  {/* Tasks Section */}
  <div className="col-lg-6">
    {/* Header */}
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
          Lorem ipsum dolor sit amet, consectetur
        </p>
      </div>
    </div>

    {/* Cards */}
    <div className="row g-3">
      {/* Progress Card */}
      <div className="col-md-6 col-lg-4">
        <div
          className="card border-0 h-100"
          style={{
            background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",
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
                <FontAwesomeIcon icon={faChartLine} style={{ color: "#6366f1", fontSize: "20px" }} />
              </div>
            </div>
            <div>
              <div className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                Progress
              </div>
              <div className="fw-bold" style={{ fontSize: "1.75rem", color: "#1a202c" }}>
                  { 
                    loadingTasks ? (
                      <Spinner/>
                    ) : 
                      (() => {
                        const done = TasksCount?.done ?? 0;
                        const inProgress = TasksCount?.inProgress ?? 0;
                        const toDo = TasksCount?.toDo ?? 0;
                        const total = done + inProgress + toDo;
                        return total > 0 ? ((done / total) * 100).toFixed(2) : "0";
                      })()
                    
                  }

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Number */}
      <div className="col-md-6 col-lg-4">
        <div
          className="card border-0 h-100"
          style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
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
                <FontAwesomeIcon icon={faTasks} style={{ color: "#f59e0b", fontSize: "20px" }} />
              </div>
            </div>
            <div>
              <div className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                Tasks Number
              </div>
              <div className="fw-bold" style={{ fontSize: "1.75rem", color: "#1a202c" }}>
                  { loadingTasks ? <Spinner/> : TasksCount?.toDo }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Number */}
      <div className="col-md-6 col-lg-4">
        <div
          className="card border-0 h-100"
          style={{
            background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
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
                <FontAwesomeIcon icon={faProjectDiagram} style={{ color: "#ec4899", fontSize: "20px" }} />
              </div>
            </div>
            <div>
              <div className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                Projects Number
              </div>
              <div className="fw-bold" style={{ fontSize: "1.7rem", color: "#1a202c" }}>
                { loading ? <Spinner/> : Projects.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Users Section */}
  <div className="col-lg-6">
    {/* Header */}
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
          Lorem ipsum dolor sit amet, consectetur
        </p>
      </div>
    </div>

    {/* Cards */}
    <div className="row g-3">
      {/* Active Users */}
      <div className="col-md-6">
        <div
          className="card border-0 h-100"
          style={{
            background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
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
                <FontAwesomeIcon icon={faUserCheck} style={{ color: "#3b82f6", fontSize: "20px" }} />
              </div>
            </div>
            <div>
              <div className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                Active
              </div>
              <div className="fw-bold" style={{ fontSize: "1.75rem", color: "#1a202c" }}>
                   { isLoading ? <Spinner/> : activatedCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inactive Users */}
      <div className="col-md-6">
        <div
          className="card border-0 h-100"
          style={{
            background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
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
                <FontAwesomeIcon icon={faUserTimes} style={{ color: "#22c55e", fontSize: "20px" }} />
              </div>
            </div>
            <div>
              <div className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                Inactive
              </div>
              <div className="fw-bold" style={{ fontSize: "1.75rem", color: "#1a202c" }}>
                  { isLoading ? <Spinner/> : notActivatedCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
