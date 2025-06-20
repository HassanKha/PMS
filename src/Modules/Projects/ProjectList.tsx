import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { ActionDropdown } from "./components/ActionDropdown";
import "./../../styles/Projects.css";
import type { Project } from "../../interfaces/Project";
import Header from "../../shared/Header";
import { toast } from "react-toastify";
import { axiosInstance, PROJECTS_URLS } from "../../services/Urls";

type SortField = keyof Project;
type SortDirection = "asc" | "desc" | null;

function ProjectList() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Food Management",
      status: "Public",
      numUsers: 10,
      numTasks: 30,
      dateCreated: "09-23-2023",
    },
    {
      id: 2,
      title: "Project Management",
      status: "Public",
      numUsers: 15,
      numTasks: 10,
      dateCreated: "09-23-2023",
    },
    {
      id: 3,
      title: "Project",
      status: "Public",
      numUsers: 3,
      numTasks: 15,
      dateCreated: "09-23-2023",
    },
    {
      id: 4,
      title: "Project",
      status: "Public",
      numUsers: 5,
      numTasks: 5,
      dateCreated: "09-23-2023",
    },
    {
      id: 5,
      title: "Project",
      status: "Public",
      numUsers: 5,
      numTasks: 4,
      dateCreated: "09-23-2023",
    },
    {
      id: 6,
      title: "Project",
      status: "Public",
      numUsers: 5,
      numTasks: 5,
      dateCreated: "09-23-2023",
    },
    {
      id: 7,
      title: "Project",
      status: "Public",
      numUsers: 5,
      numTasks: 5,
      dateCreated: "09-23-2023",
    },
    {
      id: 8,
      title: "Project",
      status: "Public",
      numUsers: 5,
      numTasks: 5,
      dateCreated: "09-23-2023",
    },
    {
      id: 9,
      title: "Project",
      status: "Public",
      numUsers: 5,
      numTasks: 5,
      dateCreated: "09-23-2023",
    },
    {
      id: 10,
      title: "Project",
      status: "Public",
      numUsers: 5,
      numTasks: 5,
      dateCreated: "09-23-2023",
    },
  ]);

  useEffect(() => {
    getAllProjects(10, 1, "");
  }, []);

  const getAllProjects = async (
    pageSize: number,
    pageNumber: number,
    title: string
  ) => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(PROJECTS_URLS.GET_PROJECTS, {
        params: { pageSize, pageNumber, title },
      });
      console.log(response);
      setProjects(response.data.data);
      // setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, index) => index + 1));
      //  setCurrentPage(pageNumber);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleView = (id: number) => {
    console.log("View project:", id);
    // Add your view logic here
  };

  const handleEdit = (id: number) => {
    console.log("Edit project:", id);
    // Add your edit logic here
  };

  const handleDelete = (id: number) => {
    console.log("Delete project:", id);
    // Add your delete logic here
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const totalResults = sortedProjects.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = sortedProjects.slice(startIndex, endIndex);

  return (
    <div
      className="px-4 pt-1 pb-2"
      style={{ backgroundColor: "#f8f9fa", minHeight: "calc(100vh - 70px)" }}
    >
      {/* Page Header */}
      <Header Title={"Projects"} BtnTitle={"Add New Project"} />
      {/* Search Bar */}
      <div className="mb-4">
        <div className="position-relative" style={{ maxWidth: "400px" }}>
          <FontAwesomeIcon
            icon={faSearch}
            className="position-absolute text-muted"
            style={{
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search By Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #dee2e6",
              height: "45px",
            }}
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white  rounded shadow-sm">
        <div className="table-responsive rounded-2">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: "#5a8a7a" }}>
              <tr>
                <th
                  className="text-white border-0 px-4 py-3 cursor-pointer table-header-hover"
                  onClick={() => handleSort("title")}
                  style={{ fontWeight: "500" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Title</span>
                    <FontAwesomeIcon icon={faSort} size="sm" />
                  </div>
                </th>
                <th
                  className="text-white border-0 px-4 py-3 cursor-pointer table-header-hover"
                  onClick={() => handleSort("status")}
                  style={{ fontWeight: "500" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Statuses</span>
                    <FontAwesomeIcon icon={faSort} size="sm" />
                  </div>
                </th>
                <th
                  className="text-white border-0 px-4 py-3 cursor-pointer table-header-hover d-none d-md-table-cell"
                  onClick={() => handleSort("numUsers")}
                  style={{ fontWeight: "500" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Num Users</span>
                    <FontAwesomeIcon icon={faSort} size="sm" />
                  </div>
                </th>
                <th
                  className="text-white border-0 px-4 py-3 cursor-pointer table-header-hover d-none d-lg-table-cell"
                  onClick={() => handleSort("numTasks")}
                  style={{ fontWeight: "500" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Num Tasks</span>
                    <FontAwesomeIcon icon={faSort} size="sm" />
                  </div>
                </th>
                <th
                  className="text-white border-0 px-4 py-3 cursor-pointer table-header-hover d-none d-lg-table-cell"
                  onClick={() => handleSort("dateCreated")}
                  style={{ fontWeight: "500" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Date Created</span>
                    <FontAwesomeIcon
                      icon={faSort}
                      size="sm"
                      className="SortIcon"
                    />
                  </div>
                </th>
                <th
                  className="text-white border-0 px-4 py-3"
                  style={{ width: "50px" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project, index) => (
                <tr
                  key={project.id}
                  className="table-row-hover"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                  }}
                >
                  <td className="px-4 py-3 text-dark">{project.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className="badge px-3 py-1 text-white"
                      style={{
                        backgroundColor: "#5a8a7a",
                        borderRadius: "20px",
                        fontSize: "12px",
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-dark d-none d-md-table-cell">
                    {project.numUsers}
                  </td>
                  <td className="px-4 py-3 text-dark d-none d-lg-table-cell">
                    {project.numTasks}
                  </td>
                  <td className="px-4 py-3 text-dark d-none d-lg-table-cell">
                    {project.dateCreated}
                  </td>
                  <td className="px-4 py-3">
                    <ActionDropdown
                      projectId={project.id}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center p-3 border-top">
          <div className="d-flex align-items-center">
            <span className="text-muted me-2">Showing</span>
            <select
              className="form-select form-select-sm me-2"
              style={{ width: "auto" }}
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-muted">of {totalResults} Results</span>
          </div>

          <div className="d-flex align-items-center">
            <span className="text-muted me-3">
              Page {currentPage} of {totalPages}
            </span>
            <div className="d-flex">
              <button
                className="btn btn-outline-secondary btn-sm me-1"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
