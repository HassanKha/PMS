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
import Header from '../../shared/Header';

import {
  FaSearch,
  FaEllipsisV,
  FaUserSlash,
  FaUserCheck,
  FaEye,
  FaIdBadge,
  FaUsers,
  FaEnvelope,
  FaGlobe,
  FaPhoneAlt,
  FaCalendarPlus,
  FaCalendarCheck,
  FaSort,
  FaSortUp,
  FaSortDown
} from "react-icons/fa";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [user, setUser] = useState<Logged_in_Users>();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Logged_in_Users | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
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

  const handleSort = (field: keyof Logged_in_Users) => {
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

  const getSortIcon = (field: keyof Logged_in_Users) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
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
      <div className='Users'>
        <Header Title="Users" BtnTitle="" />
        <div className="bg-white p-3 mt-3">
          <div className="p-2 d-flex mb-4 gap-2">
            <div className="position-relative w-25">
              <div className='position-absolute px-2 py-1'>
                <FaSearch />
              </div>
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
              <Loader name='Users' />
            </div>
          ) : (
            <div className=" shadow-lg rounded-2">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th className="text-white px-4 py-3" onClick={() => handleSort("userName")}>User Name {getSortIcon("userName")}</th>
                    <th className="text-white px-4 py-3" onClick={() => handleSort("isActivated")}>Status {getSortIcon("isActivated")}</th>
                    <th className="text-white px-4 py-3 d-none d-md-table-cell" onClick={() => handleSort("phoneNumber")}>Phone Number {getSortIcon("phoneNumber")}</th>
                    <th className="text-white px-4 py-3 d-none d-lg-table-cell" onClick={() => handleSort("email")}>Email {getSortIcon("email")}</th>
                    <th className="text-white px-4 py-3 d-none d-lg-table-cell" onClick={() => handleSort("creationDate")}>Date Created {getSortIcon("creationDate")}</th>
                    <th className="text-white px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.length > 0 ? (
                    sorted.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-3">{user.userName}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${user.isActivated ? 'activated' : 'deactivated'} px-2 py-1 texr-white rounded-3`}>
                            {user.isActivated ? "Active" : "NOT Active"}
                          </span>
                        </td>
                        <td className="px-4 py-3 d-none d-md-table-cell">{user.phoneNumber}</td>
                        <td className="px-4 py-3 d-none d-lg-table-cell">{user.email}</td>
                        <td className="px-4 py-3 d-none d-lg-table-cell">{user.creationDate && new Date(user.creationDate).toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="dropdown">
                            <button className="btn btn-link text-dark p-0" data-bs-toggle="dropdown">
                              <FaEllipsisV />
                            </button>
                            <ul className="dropdown-menu">
                              {user.isActivated ? (
                                <li>
                                  <button onClick={() => handleShowDeactivate(user.id)} className="dropdown-item text-danger">
                                    <FaUserSlash /> Block
                                  </button>
                                </li>
                              ) : (
                                <li>
                                  <button onClick={() => handleShowActivate(user.id)} className="dropdown-item text-success">
                                    <FaUserCheck /> Activate
                                  </button>
                                </li>
                              )}
                              <li>
                                <button onClick={() => handleShowDetails(user.id)} className="dropdown-item text-info">
                                  <FaEye /> View
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4"><NoData /></td>
                    </tr>
                  )}
                </tbody>
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
      </div>

      <Modal show={showDeactivate} onHide={handleCloseDeactivate} centered>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
          <span className='text-danger'><FaUserSlash /></span>
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
          <span className='text-success'><FaUserCheck /></span>
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
      <FaUsers /> User Details
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
          <span className='text-secondary mb-1 d-inline-block'><FaIdBadge /></span>
          <strong>ID:</strong> {user?.id}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <span className='text-primary mb-1 d-inline-block'><FaUsers /></span>
          <strong>Name:</strong> {user?.userName}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <span className='text-danger mb-1 d-inline-block'><FaEnvelope /></span>
          <strong>Email:</strong> {user?.email}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <span className='text-success mb-1 d-inline-block'><FaGlobe /></span>
          <strong>Country:</strong> {user?.country}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <span className='text-warning mb-1 d-inline-block'><FaPhoneAlt /></span>
          <strong>Phone:</strong> {user?.phoneNumber}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <span className='text-success mb-1 d-inline-block'><FaCalendarPlus /></span>
          <strong>Created:</strong> {user?.creationDate && new Date(user.creationDate).toLocaleString()}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <span className='text-success mb-1 d-inline-block'><FaCalendarCheck /></span>
          <strong>Updated:</strong> {user?.modificationDate && new Date(user.modificationDate).toLocaleString()}
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