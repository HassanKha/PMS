import HomeBG from "../../assets/home-bg.png";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { axiosInstance, TASKS_URLS } from "../../services/Urls";
import { toast } from "react-toastify";
import type { TasksCount } from "../../interfaces/Tasks";
import { AuthContext } from "../../contexts/AuthContext";
import { useUsersContext } from "../../contexts/UsersContext";
import {  ChartLineIcon, ProjectDiagramIcon, TasksIcon, UserCheckIcon, UserTimesIcon } from '../../assets/DashboardSVG/DashboardIcons';
import { LoadingSpin } from "../../assets/SVGIcons/SpinnerIcon";

export default function Dashboard() {

const calculateStats = (count: TasksCount | null, type: "toDo" | "inProgress" | "done") => {
  if (!count) return { value: 0, percent: 0 };
  const { done = 0, inProgress = 0, toDo = 0 } = count;
  const total = done + inProgress + toDo;
  const value = count[type] || 0;
  const percent = total === 0 ? 0 : (value / total) * 100;
  return { value, percent };
};

  const auth = useContext(AuthContext);
  const { isLoading, activatedCount, notActivatedCount, getAllUsers } =
    useUsersContext();


useEffect(() => {
  if (auth?.LoginData?.roles[0] === "Manager") {
    getAllUsers(1000, 1, "");
  }
  getAllTasks();
}, [auth?.LoginData?.roles]);

  const [TasksCount, setTasksCount] = useState<TasksCount | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const getAllTasks = useCallback(async () => {
    try {
      setLoadingTasks(true)
      let response = await axiosInstance.get(TASKS_URLS.GET_TASKS_COUNT);
      setTasksCount(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingTasks(false);
    }
  },[]);


  const stats = useMemo(() => ({
  toDo: calculateStats(TasksCount, "toDo"),
  inProgress: calculateStats(TasksCount, "inProgress"),
  done: calculateStats(TasksCount, "done"),
}), [TasksCount]);

  return (
   <main
      className="p-4 bg-light min-vh-100"
      role="main" aria-labelledby="dashboard-heading"
    >
      <section
        className="rounded-4 p-5 mb-5 position-relative overflow-hidden text-white"
    aria-hidden="true"

      >
        <img
  src={HomeBG}
  alt=""
  className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
  style={{ zIndex: 1 }}
  loading="lazy"
  aria-hidden="true"
/>
        <div className="position-relative" style={{ zIndex: 2 }}>
          <h1 id="dashboard-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "300" }}>
            Welcome <span style={{ color: "#ed8936", fontWeight: "400" }}>{auth?.LoginData?.userName}</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", opacity: 0.9 }}>
            You can add projects and assign tasks to your team
          </p>
        </div>
      </section>

      <section   aria-hidden="true" role="region" aria-labelledby="task-statistics" className="row g-4">
        <div className="col-lg-6">
          <TaskIntro title="Tasks" desc="Monitor your project progress, track tasks, and manage workload with ease." />
          <div className="row g-3">
            <StatCard
              icon={<ChartLineIcon />}
              label="Tasks Number"
              color="#f59e0b"
              gradient="linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
              stats={stats.toDo}
              loading={loadingTasks}
            />
            <StatCard
              icon={<ProjectDiagramIcon />}
              label="In progress"
              color="#ec4899"
              gradient="linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)"
              stats={stats.inProgress}
              loading={loadingTasks}
            />
            <StatCard
              icon={<TasksIcon />}
              label="Done"
              color="#798ceb"
              gradient="linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)"
              stats={stats.done}
              loading={loadingTasks}
            />
          </div>
        </div>

        {auth?.LoginData?.roles[0] === "Manager" && (
          <div className="col-lg-6">
            <TaskIntro title="Users" desc="Track user engagement — monitor active contributors and identify inactive accounts." />
            <div className="row g-3">
              <UserCard
                label="Active"
                count={activatedCount}
                color="#3b82f6"
                gradient="linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)"
                icon={<UserCheckIcon />}
                loading={isLoading}
              />
              <UserCard
                label="Inactive"
                count={notActivatedCount}
                color="#22c55e"
                gradient="linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
                icon={<UserTimesIcon />}
                loading={isLoading}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}


function TaskIntro({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="d-flex align-items-start mb-3">
      <div className="me-3" style={{ width: "4px", height: "60px", backgroundColor: "#ed8936", borderRadius: "2px" }} />
      <div>
        <h2 id="task-statistics" className="mb-2 fw-bold text-dark h5">{title}</h2>
        <p className="text-muted mb-0 small">{desc}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, color, gradient, stats, loading }: any) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card border-0 h-100 dashboard-card" style={{ background: gradient, borderRadius: "16px" }}>
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, backgroundColor: `${color}33` }}>{icon}</div>
          </div>
          <div>
            <div className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: "500" }}>{label}</div>
            <div className="fw-bold" style={{ fontSize: "1.75rem", color: "#1a202c" }}>
              {loading ? LoadingSpin("2")  : <>{`(${stats.value}) `}<span style={{ color, marginLeft: "10px" }}>{stats.percent.toFixed(0)}%</span></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserCard({ icon, label, count, color, gradient, loading }: any) {
  return (
    <div className="col-md-6">
      <div className="card border-0 h-100 dashboard-card" style={{ background: gradient, borderRadius: "16px" }}>
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, backgroundColor: `${color}33` }}>{icon}</div>
          </div>
          <div>
            <div className="text-muted mb-1" style={{ fontSize: "0.9rem", fontWeight: "500" }}>{label}</div>
            <div className="fw-bold" style={{ fontSize: "1.75rem", color: "#1a202c" }}>{loading ? LoadingSpin("2") : count}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
