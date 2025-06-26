import { useContext, useEffect, useState } from "react";
import {
  FaExclamationTriangle,
  FaRedo,
  FaSearch,
  FaSort,
} from "react-icons/fa";
import { ActionDropdown } from "./components/ActionDropdown";
import "./../../styles/Projects.css";
import type { Project } from "../../interfaces/Project";
import Header from "../../shared/Header";
import { axiosInstance, PROJECTS_URLS } from "../../services/Urls";
import { ProjectModal } from "./components/ProjectModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useProjectContext } from "../../contexts/ProjectContext";
import NoData from "../../shared/NoData";
import Loader from "../../shared/Loader";
import { AuthContext } from "../../contexts/AuthContext";

type SortField = keyof Project;
type SortDirection = "asc" | "desc" | null;

function ProjectList() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const {
    projects: Projects,
    totalResults,
    pages,
    loading,
    error,
    fetchProjects,
  } = useProjectContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
const auth = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    fetchProjects(5, 1, "");
  }, []);

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

  const handleView = (id: number) => {
    setSelectedProjectId(id);
    setModalOpen(true);
  };

  const handleDelete = async (id: number, title: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger mx-3",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: `This will permanently delete the project "${title}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(PROJECTS_URLS.DELETE_PROJECT(id));

        fetchProjects(itemsPerPage, currentPage, searchTerm);

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: `The project ${title} has been deleted successfully.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error: any) {
        swalWithBootstrapButtons.fire({
          title: "Error!",
          text:
            error.response?.data?.message || "Failed to delete the project.",
          icon: "error",
        });
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProjectId(null);
  };

  const filtered = Projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    const va = a[sortField];
    const vb = b[sortField];
    if (sortField === "creationDate") {
      const da = new Date(va as string).getTime();
      const db = new Date(vb as string).getTime();
      return sortDirection === "asc" ? da - db : db - da;
    }
    if (typeof va === "number" && typeof vb === "number") {
      return sortDirection === "asc" ? va - vb : vb - va;
    }
    return sortDirection === "asc"
      ? String(va).localeCompare(String(vb))
      : String(vb).localeCompare(String(va));
  });

  const currentProjects = sorted;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setItemsPerPage(5);
    fetchProjects(5, 1, value);
  };

  useEffect(() => {
    setCurrentPage(1);
    setItemsPerPage(5);
    fetchProjects(itemsPerPage, 1, searchTerm);
  }, [searchTerm]);

  const getProjectById = (id: number): Project | undefined => {
    return currentProjects.find((project) => project.id === id);
  };

  const selectedProject = selectedProjectId
    ? getProjectById(selectedProjectId)
    : null;

  return (
    <div
      className="px-4 pt-1 pb-2"
     
    >
      <Header Title={"Projects"} BtnTitle={"Add New Project"} />
      <div className="mb-4">
        <div className="position-relative search-container">
          <div
            className="position-absolute text-muted search-icon-container"
          >
            <FaSearch />
          </div>
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
          <Loader name="Projects" />
        </div>
      )}

      {error && (
        <div className="bg-white rounded shadow-sm p-5 text-center">
          <FaExclamationTriangle
            size={32}
            className="text-danger mb-3"
          />
          <h5 className="text-dark mb-3">Something went wrong</h5>
          <p className="text-muted mb-4">{error}</p>
          <button
            className="btn d-inline-flex wrong-button align-items-center px-4 py-2"
            onClick={() => fetchProjects(10, 1, "")}
        
          >
            <FaRedo className="me-2" />
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded shadow-sm">
          <div className="table-responsive rounded-2">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: "#5a8a7a" }}>
                <tr>
                  <th
                    className="text-white border-0 px-4 py-3 cursor-pointer table-header-hover"
                    onClick={() => handleSort("title")}
                   
                  >
                    <div className="d-flex align-items-center justify-content-lg-evenly justify-content-between">
                      <span className="text-center">Title</span>
                      <FaSort size={14} />
                    </div>
                  </th>
                  <th
                    className="text-white border-0 px-5 py-3 cursor-pointer table-header-hover"
                    onClick={() => handleSort("description")}
                   
                  >
                    <div className="d-flex align-items-center gap-1 justify-content-between">
                      <span>Description</span>
                      <FaSort size={14} />
                    </div>
                  </th>
                  <th
                    className="text-white border-0 px-4 py-3 cursor-pointer table-header-hover d-none d-lg-table-cell"
                    onClick={() => handleSort("numTasks")}
                   
                  >
                    <div className="d-flex align-items-center justify-content-lg-evenly justify-content-between">
                      <span>Num Tasks</span>
                      <FaSort size={14} />
                    </div>
                  </th>
                  <th
                    className="text-white border-0 px-4 py-3 cursor-pointer table-header-hover d-none d-lg-table-cell"
                    onClick={() => handleSort("creationDate")}
                   
                  >
                    <div className="d-flex align-items-center justify-content-lg-evenly justify-content-between">
                      <span>Date Created</span>
                      <FaSort size={14} />
                    </div>
                  </th>
                  
                  {auth?.LoginData?.roles[0] === 'Manager' &&  <th className="text-white border-0 px-4 py-3" style={{ width: "50px" }}></th>}
                </tr>
              </thead>

              {currentProjects.length > 0 ? (
                <tbody>
                  {currentProjects.map((project, index) => (
                    <tr
                      key={project.id}
                      className="table-row-hover"
                     
                    >
                      <td className="px-4 py-3 text-dark">{project.title}</td>
                      <td className="px-1 py-4">
                        <span
                          className="badge description-span px-2 py-1 text-white table-header-wrap"
                         
                        >
                          {project.description.length > 25
                            ? `${project.description.slice(0, 25)}...`
                            : project.description}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-dark d-none d-md-table-cell">
                        <span
                        className={`badge num-of-tasks px-2 py-1 ${project.task.length > 0 ? 'above-zero' : 'below-zero'}`}                         
                        >
                          {project.numTasks} tasks
                        </span>
                      </td>
                      <td className="px-4 py-3 text-dark d-none d-lg-table-cell">
                        {project.creationDate.slice(0, 10)}
                      </td>
                      {auth?.LoginData?.roles[0] === 'Manager' &&  <td className="px-lg-4 px-1 py-3">
                        <ActionDropdown
                          projectId={project.id}
                          onView={handleView}
                          onEdit={() =>
                            navigate(`/dashboard/project-data`, {
                              state: project,
                            })
                          }
                          onDelete={() =>
                            handleDelete(project.id, project.title)
                          }
                        />
                      </td>

                      }
                     
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      <NoData />
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center p-3 border-top">
            <div className="d-flex justify-content-center align-items-center">
              <span className="text-muted me-2">Showing</span>
              <select
                className="form-select options-select form-select-sm me-2"
                value={itemsPerPage}
                onChange={(e) => {
                  const newPageSize = Number(e.target.value);
                  setItemsPerPage(newPageSize);
                  fetchProjects(newPageSize, 1, searchTerm);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span className="text-muted">
                of {totalResults ?? "..."} Results
              </span>
            </div>

            <div className="d-flex align-items-center">
              <span className="text-muted me-3">
                Page {currentPage} of {pages.length}
              </span>
              <div className="d-flex">
                <button
                  className="btn btn-outline-secondary btn-sm me-1"
                  onClick={() => {
                    const prev = currentPage - 1;
                    if (prev >= 1)
                      fetchProjects(itemsPerPage, prev, searchTerm);
                  }}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    const next = currentPage + 1;
                    if (next <= pages.length)
                      fetchProjects(itemsPerPage, next, searchTerm);
                  }}
                  disabled={currentPage === pages.length}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProjectModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
}

export default ProjectList;

