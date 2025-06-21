import React, { useEffect, useState } from 'react';
import "../../styles/Users.css";
import { axiosInstance, ImageURL, USERS_URLS } from '../../services/Urls';
import type { Logged_in_Users } from '../../interfaces/Users';
import Loader from '../../shared/Loader';
import NoData from '../../shared/NoData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import defaultImage from "../../assets/user-profile-icon-vector-avatar-600nw-2247726673.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import type { User } from '../../interfaces/UserProfile';
import Header from '../../shared/Header';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

type SortField = keyof User;
type SortDirection = "asc" | "desc" | null;

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [user, setUser] = useState<Logged_in_Users>();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [users, setUsers] = useState<Logged_in_Users[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDeactivate = () => setShowDeactivate(false);
  const handleCloseActivate = () => setShowActivate(false);
  const handleCloseDetails = () => setShowDetails(false);

  const handleShowDeactivate = (id: number) => {
    setShowDeactivate(true);
    setUserId(id);
  };

  const handleShowActivate = (id: number) => {
    setShowActivate(true);
    setUserId(id);
  };

  const handleShowDetails = (id: number) => {
    setShowDetails(true);
    getSpecificUser(id);
  };

  const GetAllLoggedUsers = async (pageSize: number, pageNumber: number, userName: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(USERS_URLS.GET_LOGGED_IN_USERS, {
        params: { pageSize, pageNumber, userName },
      });
      setUsers(response?.data?.data || []);
      setPages(Array(response.data.totalNumberOfPages).fill(0).map((_, idx) => idx + 1));
      setItemsPerPage(response.data.pageSize);
      setTotalResults(response.data.totalNumberOfRecords);
      setCurrentPage(pageNumber);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getSpecificUser = async (id: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(USERS_URLS.GET_SPECIFIC_USER(id));
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    GetAllLoggedUsers(itemsPerPage, 1, value);
  };

  const toggleActivatedEmployee = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(USERS_URLS.TOGGLE_ACTIVATED_EMPLOYEE(userId));
      toast.success(showActivate ? 'You have Activated this user successfully' : 'You have Blocked this user successfully');
      GetAllLoggedUsers(itemsPerPage, currentPage, searchTerm);
      handleCloseActivate();
      handleCloseDeactivate();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return faSort;
    return sortDirection === "asc" ? faSortUp : faSortDown;
  };

  const filtered = users.filter((p) =>
    p.userName.toLowerCase().includes(searchTerm.toLowerCase())
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

    if (typeof va === "boolean" && typeof vb === "boolean") {
      return sortDirection === "asc"
        ? Number(va) - Number(vb)
        : Number(vb) - Number(va);
    }

    if (typeof va === "number" && typeof vb === "number") {
      return sortDirection === "asc" ? va - vb : vb - va;
    }

    return sortDirection === "asc"
      ? String(va).localeCompare(String(vb))
      : String(vb).localeCompare(String(va));
  });

  const handlePagination = (pageNumber: number) => {
    GetAllLoggedUsers(itemsPerPage, pageNumber, searchTerm);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setItemsPerPage(newPageSize);
    GetAllLoggedUsers(newPageSize, 1, searchTerm);
  };

  useEffect(() => {
    GetAllLoggedUsers(itemsPerPage, 1, '');
  }, []);

  return (
    <>
       <Header Title={"Users"} BtnTitle={""} />

      <div className="bg-white p-3 mt-3">
        <div className="p-2 d-flex gap-2">
          <div className="position-relative w-25">
            <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
            <input
              onChange={handleSearch}
              type="text"
              className="form-control rounded-pill ps-5"
              placeholder="Search Users"
              value={searchTerm}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center loader">
           <div className="bg-white rounded shadow-sm p-5 text-center">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      size="2x"
                      style={{ color: "#5a8a7a" }}
                      className="mb-3"
                    />
                    <h5 className="text-muted">Loading Users...</h5>
                    <p className="text-muted mb-0">
                      Please wait while we fetch your data
                    </p>
                  </div>
          </div>
        ) : (
          <div className="table-responsive shadow-lg rounded-2">
            <table className="table table-hover mb-0">
              <thead >
                <tr>
                  <th className="text-white px-4 py-3" onClick={() => handleSort("userName")} style={{ cursor: "pointer" }}>
                    User Name <FontAwesomeIcon className="ms-1" icon={getSortIcon("userName")} />
                  </th>
                  <th className="text-white px-4 py-3" onClick={() => handleSort("isActivated")} style={{ cursor: "pointer" }}>
                    Status <FontAwesomeIcon className="ms-1" icon={getSortIcon("isActivated")} />
                  </th>
                  <th className="text-white px-4 py-3 d-none d-md-table-cell" onClick={() => handleSort("phoneNumber")} style={{ cursor: "pointer" }}>
                    Phone Number <FontAwesomeIcon className="ms-1" icon={getSortIcon("phoneNumber")} />
                  </th>
                  <th className="text-white px-4 py-3 d-none d-lg-table-cell" onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                    Email <FontAwesomeIcon className="ms-1" icon={getSortIcon("email")} />
                  </th>
                  <th className="text-white px-4 py-3 d-none d-lg-table-cell" onClick={() => handleSort("creationDate")} style={{ cursor: "pointer" }}>
                    Date Created <FontAwesomeIcon className="ms-1" icon={getSortIcon("creationDate")} />
                  </th>
                  <th className="text-white px-4 py-3"></th>
                </tr>
              </thead>
              {sorted.length > 0 ? (
                <tbody>
                  {sorted.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3">{user.userName}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`badge ${user.isActivated?'activated':'deactivated'} px-2 py-1 texr-white rounded-3`}
                        >
                          {user.isActivated ? "Active" : "NOT Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 d-none d-md-table-cell">{user.phoneNumber}</td>
                      <td className="px-4 py-3 d-none d-lg-table-cell">{user.email}</td>
                      <td className="px-4 py-3 d-none d-lg-table-cell">{user.creationDate && new Date(user.creationDate).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="dropdown">
                          <button className="btn btn-link text-dark p-0" data-bs-toggle="dropdown">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          <ul className="dropdown-menu">
                            {user.isActivated ? (
                              <li><button onClick={() => handleShowDeactivate(user.id)} className="dropdown-item text-danger"><i className="fa-solid fa-user-slash text-danger fa-1x mb-2"></i> Block</button></li>
                            ) : (
                              <li><button onClick={() => handleShowActivate(user.id)} className="dropdown-item text-success"> <i className="fa-solid fa-user-check text-success fa-1x mb-2"></i> Activate</button></li>
                            )}
                            <li><button onClick={() => handleShowDetails(user.id)} className="dropdown-item text-info"><i className="fas fa-eye me-2"></i>View</button></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-4"><NoData /></td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        )}

        {users.length > 0 && (
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center p-3 border-top">
            <div className="d-flex align-items-center mb-2 mb-lg-0">
              <span className="text-muted me-2">Showing</span>
              <select
                className="form-select form-select-sm me-2"
                value={itemsPerPage}
                onChange={handlePageSizeChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span className="text-muted">of {totalResults ?? "..."} Results</span>
            </div>

            <div className="d-flex align-items-center">
              <span className="text-muted me-3">Page {currentPage} of {pages.length}</span>
              <div className="d-flex">
                <button className="btn btn-outline-secondary btn-sm me-1" onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>‹</button>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === pages.length}>›</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal show={showDeactivate} onHide={handleCloseDeactivate} centered>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
          <i className="fa-solid fa-user-slash text-danger fa-2x mb-2"></i>
          Are You Sure You Want to Block This User?!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeactivate}>Close</Button>
          <Button onClick={toggleActivatedEmployee} variant="danger">
            {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : 'Block'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showActivate} onHide={handleCloseActivate} centered>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
          <i className="fa-solid fa-user-check text-success fa-2x mb-2"></i>
          Are You Sure You Want to Activate This User?!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseActivate}>Close</Button>
          <Button onClick={toggleActivatedEmployee} variant="success">
            {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : 'Activate'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <i className="fas fa-user text-primary"></i> User Details
          </Modal.Title>
        </Modal.Header>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center gap-2 p-4">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </div>
        ) : (
          <Modal.Body>
            <div className="text-center mb-3">
              <img
                className="img-fluid user-img rounded-circle border"
                src={user?.imagePath ? `${ImageURL}${user?.imagePath}` : defaultImage}
                alt="User"
              />
            </div>
            <div className="list-group">
              <div className="list-group-item d-flex align-items-center gap-2">
                <i className="fas fa-id-badge text-secondary"></i> <strong>ID:</strong> {user?.id}
              </div>
              <div className="list-group-item d-flex align-items-center gap-2">
                <i className="fas fa-user text-primary"></i> <strong>Name:</strong> {user?.userName}
              </div>
              <div className="list-group-item d-flex align-items-center gap-2">
                <i className="fas fa-envelope text-danger"></i> <strong>Email:</strong> {user?.email}
              </div>
              <div className="list-group-item d-flex align-items-center gap-2">
                <i className="fas fa-globe text-success"></i> <strong>Country:</strong> {user?.country}
              </div>
              <div className="list-group-item d-flex align-items-center gap-2">
                <i className="fas fa-phone text-warning"></i> <strong>Phone:</strong> {user?.phoneNumber}
              </div>
              <div className="list-group-item d-flex align-items-center gap-2">
                <i className="fas fa-calendar-plus text-success"></i> <strong>Created:</strong> {user?.creationDate && new Date(user.creationDate).toLocaleString()}
              </div>
              <div className="list-group-item d-flex align-items-center gap-2">
                <i className="fas fa-calendar-check text-success"></i> <strong>Updated:</strong> {user?.modificationDate && new Date(user.modificationDate).toLocaleString()}
              </div>
            </div>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
