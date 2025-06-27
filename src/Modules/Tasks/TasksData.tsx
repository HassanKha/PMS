import { useForm, type FieldError } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, TASKS_URLS } from "../../services/Urls";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useUsersContext } from "../../contexts/UsersContext";
import type { postTask } from "../../interfaces/Task";
function TasksData() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<postTask>();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const { isLoading, users, getAllUsers } = useUsersContext();
  const {
    projects: Projects,
    loading: loadingProjects,
    fetchProjects,
  } = useProjectContext();

  const data = location.state?.task || location.state;
  const isEdit = !!data;
  const taskId = data?.id;

  useEffect(() => {
    fetchProjects(1000, 1, "");
    if (auth?.LoginData?.roles[0] === "Manager") {
      getAllUsers(1000, 1, "");
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("employeeId", data.employee?.id || data.employeeId);
      setValue("projectId", data.project?.id || data.projectId);
    }
  }, [isEdit, data, setValue]);

  const onSubmit = async (formData: postTask) => {
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        employeeId: formData.employeeId,
        projectId: formData.projectId,
        status: formData.status || "ToDo",
      };

      if (isEdit) {
        if (!taskId) {
          throw new Error("Task ID is missing for edit");
        }
        const response = await axiosInstance.put(
          TASKS_URLS.EDIT_TASK(taskId),
          payload
        );
        toast.success(response.data?.message || "Task updated successfully");
      } else {
        const response = await axiosInstance.post(TASKS_URLS.Add_TASK, payload);
        toast.success(response.data?.message || "Task added successfully");
      }

      navigate("/dashboard/tasks");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="AllPageFormProjects">
      <div className="container-fluid">
        <div className="headerProject p-3">
          <Link to="/dashboard/tasks" className="fancy-hover-link text-decoration-none text-black">
            <i className="fa-solid fa-chevron-left mx-1"></i> View All Tasks
          </Link>
          <h3 className="pt-3">{isEdit ? "Edit Task" : "Add New Task"}</h3>
        </div>
        
        <div className="formProjects py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="inputTitle" className="form-label">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter task title"
                type="text"
                id="inputTitle"
                className="form-control"
              />
              {errors.title && (
                <span className="text-danger">
                  {(errors.title as FieldError).message}
                </span>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="inputDesc" className="form-label">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                id="inputDesc"
                className="form-control"
                placeholder="Enter task description"
                rows={3}
              />
              {errors.description && (
                <span className="text-danger">
                  {(errors.description as FieldError).message}
                </span>
              )}
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="inputEmployee" className="form-label">User</label>
                {isLoading ? (
                  <div className="text-muted">Loading users...</div>
                ) : (
                  <select
                    {...register("employeeId", { required: "User is required" })}
                    id="inputEmployee"
                    className="form-control"
                  >
                    <option value="">Select User</option>
                    {users.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.userName}</option>
                    ))}
                  </select>
                )}
                {errors.employeeId && (
                  <span className="text-danger">
                    {(errors.employeeId as FieldError).message}
                  </span>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="inputProject" className="form-label">Project</label>
                {loadingProjects ? (
                  <div className="text-muted">Loading projects...</div>
                ) : (
                  <select
                    {...register("projectId", { required: "Project is required" })}
                    id="inputProject"
                    className="form-control"
                  >
                    <option value="">Select Project</option>
                    {Projects.map((proj) => (
                      <option key={proj.id} value={proj.id}>{proj.title}</option>
                    ))}
                  </select>
                )}
                {errors.projectId && (
                  <span className="text-danger">
                    {(errors.projectId as FieldError).message}
                  </span>
                )}
              </div>
            </div>

            <div className="btnFormProjects d-flex justify-content-between align-items-center mt-4">
              <button 
                type="button" 
                onClick={() => navigate("/dashboard/tasks")} 
                className="btn_CancelForm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btnSaveProject"
                disabled={loading || loadingProjects}
              >
                {loading ? <i className='fa fa-spinner fa-spin'></i> : isEdit ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default TasksData;