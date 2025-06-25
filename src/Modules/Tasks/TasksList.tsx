import { useEffect, useState } from "react";
import {
  SearchIcon,
  SortIcon,
  ExclamationTriangleIcon,
  RedoIcon
} from "../../assets/SVGIcons/NotificationIcons";

import Header from "../../shared/Header";
import NoData from "../../shared/NoData";
import "../../styles/Tasks.css";
import Loader from "../../shared/Loader";
import { useTaskContext } from "../../contexts/TaskContext";
import "./../../styles/Projects.css";
import { ActionDropdown } from "../Projects/components/ActionDropdown";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import type { Task } from "../../interfaces/Tasks";
import { TaskModal } from "./components/TaskModel";
import { axiosInstance, TASKS_URLS } from "../../services/Urls";

type SortField = "title" | "description" | "status" | "creationDate";
type SortDirection = "asc" | "desc" | null;

function TaskList() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { tasks, totalResults, pages, loading, error, fetchTasks } =
    useTaskContext();

  useEffect(() => {
    fetchTasks(5, 1, "");
  }, []);

  const navigate = useNavigate();
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
            ? null
            : "asc"
      );
      if (sortDirection === "desc") setSortField(null);
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    const va = a[sortField];
    const vb = b[sortField];
    if (sortField === "creationDate") {
      return sortDirection === "asc"
        ? new Date(va).getTime() - new Date(vb).getTime()
        : new Date(vb).getTime() - new Date(va).getTime();
    }
    return sortDirection === "asc"
      ? String(va).localeCompare(String(vb))
      : String(vb).localeCompare(String(va));
  });

  const currentTasks = sorted;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setItemsPerPage(5);
    fetchTasks(5, 1, value);
  };

  useEffect(() => {
    setCurrentPage(1);
    setItemsPerPage(5);
    fetchTasks(itemsPerPage, 1, searchTerm);
  }, [searchTerm]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(
    null
  );
  const handleView = (id: number) => {
    setSelectedTaskId(id);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTaskId(null);
  };
  const handleDeleteTask = async (id: number, title: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger mx-3",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: `This will permanently delete the task "${title}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(TASKS_URLS.DELETE_TASK_BY_MANAGER(id));

        fetchTasks(itemsPerPage, currentPage, searchTerm);

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: `The task ${title} has been deleted successfully.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error: any) {
        swalWithBootstrapButtons.fire({
          title: "Error!",
          text:
            error.response?.data?.message || "Failed to delete the task.",
          icon: "error",
        });
      }
    }
  };


  const getTaskById = (id: number): Task | undefined => {
    return currentTasks.find((task) => task.id === id);
  };

  const selectedTask = selectedTaskId
    ? getTaskById(selectedTaskId)
    : null;

  return (
    <div
      className="px-4 tasks pt-1 pb-2"
    >
      <Header Title={"Tasks"} BtnTitle={"Add New Task"} />

      <div className="mb-4">
        <div className="position-relative" style={{ maxWidth: "400px" }}>
          <div className="position-absolute px-2 py-1 text-muted"><SearchIcon/></div>
          

          <input
            type="text"
            className="form-control rounded-pill ps-5"
            placeholder="Search By Title"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center loader">
          <Loader name="Tasks" />
        </div>
      )}

      {error && (
        <div className="bg-white rounded shadow-sm p-5 text-center">
          <ExclamationTriangleIcon  />
          <h5 className="text-dark mb-3">Something went wrong</h5>
          <p className="text-muted mb-4">{error}</p>
          <button
            className="btn btn-danger px-4 py-2"
            onClick={() => fetchTasks(itemsPerPage, 1, searchTerm)}
          >
            <RedoIcon/> Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded shadow-sm">
          <div className="table-responsive rounded-2">
            <table className="table table-hover mb-0">
              <thead >
                <tr>
                  <th
                    className="text-white cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Title <SortIcon />
                  </th>
                  <th
                    className="text-white cursor-pointer"
                    onClick={() => handleSort("description")}
                  >
                    Description<SortIcon />
                  </th>
                  <th
                    className="text-white"
                    onClick={() => handleSort("status")}
                  >
                    Status <SortIcon />
                  </th>
                  <th className="text-white">Project</th>
                  <th className="text-white">Employee</th>
                  <th
                    className="text-white cursor-pointer"
                    onClick={() => handleSort("creationDate")}
                  >
                    Date Created <SortIcon />
                  </th>
                  <th className="text-white"></th>
                </tr>

              </thead>
              <tbody>
                {currentTasks.length > 0 ? (
                  currentTasks.map((task, index) => (
                    <tr
                      key={task?.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      }}
                    >
                      <td>{task?.title}</td>
                      <td>{task?.description}</td>
                      <td>{task?.status}</td>
                      <td>{task?.project?.title}</td>
                      <td>{task?.employee?.userName}</td>
                      <td>{task?.creationDate.slice(0, 10)}</td>
                      <td className="px-lg-4 px-1 py-3">
                        <ActionDropdown
                          projectId={task?.id}
                          onView={handleView}
                          onEdit={() =>
                            navigate(`/dashboard/tasks-data`, {
                              state: task
                            }
                            )
                          }
                          onDelete={() =>
                            handleDeleteTask(task?.id, task?.title)
                          }
                        />
                      </td>
                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="d-flex align-items-center">
              <span className="me-2">Showing</span>
              <select
                className="form-select form-select-sm me-2"
                value={itemsPerPage}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  setItemsPerPage(newSize);
                  setCurrentPage(1); // Reset to valid page
                  fetchTasks(newSize, 1, searchTerm);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span>of {totalResults ?? "..."} Results</span>
            </div>

            <div className="d-flex align-items-center">
              <span className="text-muted me-3">
                Page {currentPage} of {pages.length}
              </span>
              <button
                className="btn btn-outline-secondary btn-sm me-1"
                onClick={() => {
                  const prev = currentPage - 1;
                  if (prev >= 1) {
                    fetchTasks(itemsPerPage, prev, searchTerm);
                    setCurrentPage(prev); // <-- Update the state
                  }
                }}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  const next = currentPage + 1;
                  if (next <= pages.length) {
                    fetchTasks(itemsPerPage, next, searchTerm);
                    setCurrentPage(next); // <-- Update the state
                  }
                }}
                disabled={currentPage === pages.length}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
   

      <TaskModal isOpen={modalOpen} onClose={handleCloseModal} task={selectedTask} />
    </div>
  );
}

export default TaskList;
