import { useForm, type FieldError } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/Urls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Task {
  id?: string;
  title: string;
  description: string;
  employeeId: string;
  projectId: string;
  status?: string;
  employee?: { id: string; userName: string };
  project?: { id: string; title: string };
}

interface User {
  id: string;
  userName: string;
}

interface Project {
  id: string;
  title: string;
}

function TasksData() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Task>();
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.task || location.state;
  const isEdit = !!data;
  const taskId = data?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, employeesRes] = await Promise.all([
          axiosInstance.get("https://upskilling-egypt.com:3003/api/v1/Project/"),
          axiosInstance.get("https://upskilling-egypt.com:3003/api/v1/Users/")
        ]);
        setProjects(projectsRes.data?.data || []);
        setEmployees(employeesRes.data?.data || []);
      } catch (error) {
        toast.error("Failed to load dropdown data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isEdit) {
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("employeeId", data.employee?.id || data.employeeId);
      setValue("projectId", data.project?.id || data.projectId);
      setValue("status", data.status || "ToDo");
    }
  }, [isEdit, data, setValue]);

  const onSubmit = async (formData: Task) => {
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        employeeId: formData.employeeId,
        projectId: formData.projectId,
        status: formData.status || "ToDo"
      };

      if (isEdit) {
        const response = await axiosInstance.put(
          `https://upskilling-egypt.com:3003/api/v1/Task/${taskId}`,
          payload
        );
        toast.success(response.data?.message || "Task updated successfully");
      } else {
        const response = await axiosInstance.post(
          "https://upskilling-egypt.com:3003/api/v1/Task",
          payload
        );
        toast.success(response.data?.message || "Task added successfully");
      }

      navigate("/dashboard/tasks");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white border-bottom-0">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">{isEdit ? "Edit Task" : "Add New Task"}</h4>
            <Link to="/dashboard/tasks" className="btn btn-sm btn-outline-secondary">
              <i className="fa-solid fa-chevron-left me-1"></i> View All Tasks
            </Link>
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Enter task title"
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                rows={3}
                placeholder="Enter task description"
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description.message}</div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">User</label>
                <select
                  {...register("employeeId", { required: "User is required" })}
                  className={`form-select ${errors.employeeId ? "is-invalid" : ""}`}
                >
                  <option value="">Select User</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.userName}</option>
                  ))}
                </select>
                {errors.employeeId && (
                  <div className="invalid-feedback">{errors.employeeId.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Project</label>
                <select
                  {...register("projectId", { required: "Project is required" })}
                  className={`form-select ${errors.projectId ? "is-invalid" : ""}`}
                >
                  <option value="">Select Project</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>{proj.title}</option>
                  ))}
                </select>
                {errors.projectId && (
                  <div className="invalid-feedback">{errors.projectId.message}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select {...register("status")} className="form-select">
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/tasks")}
                className="btn btn-outline-secondary px-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                  </>
                ) : isEdit ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TasksData;
