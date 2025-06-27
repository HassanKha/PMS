import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaCog,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import PMSIcon from "../assets/PMS2.png";
import { AuthContext } from "../contexts/AuthContext";
import { ImageURL } from "../services/Urls";
import NotePopup from "./NotePopup";
import { useDarkModeContext } from "../contexts/DarkModeContext";



interface NavbarProps {
  handleToggleSidebar: () => void;
  sidebarVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  handleToggleSidebar,
  sidebarVisible,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    auth?.setLoginData(null);
    navigate("/login", { replace: true });
  };

  const [showPrivileges, setShowPrivileges] = useState(false);

  const { isDark, toggleDarkMode } = useDarkModeContext();



  return (
    <nav className="navbar  navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary me-3 d-lg-none"
            onClick={handleToggleSidebar}
          >
            {sidebarVisible ? <FaTimes /> : <FaBars />}
          </button>
          <img src={PMSIcon} alt="PMSIcon" style={{ height: 40 }} />
        </div>

        <NotePopup showPrivileges={showPrivileges} setShowPrivileges={setShowPrivileges} />

        <div className="d-flex align-items-center">
          <div className="mx-auto">
            <button
            onClick={toggleDarkMode}
              className="notification-btn ntmtoggle"

              title="Toggle Dark Mode"
            
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          <button
            className="btn btn-link text-secondary position-relative me-4 p-1 notification-btn d-none d-md-inline"
            onMouseEnter={() => setShowPrivileges(true)}
            onMouseLeave={() => setShowPrivileges(false)}
            onClick={() => setShowPrivileges(!showPrivileges)}
          >
            <FaBell size={20} color="#EF9B28" />
            <span className="badge bg-danger notification-badge position-absolute top-0 start-100 translate-middle rounded-pill">
              1
            </span>
          </button>

          <div className="dropdown user-hover-box px-2" style={{ cursor: "pointer" }}>
            <div className="d-flex align-items-center" onClick={toggleDropdown}>
              <div className="rounded-circle me-3 img-container text-white d-flex align-items-center justify-content-center">
                {auth?.CurrentUserData?.imagePath ? (
                  <img
                    src={`${ImageURL + auth?.CurrentUserData?.imagePath}`}
                    alt="profile Pic"
                    className="w-100 h-100 rounded-circle"
                  />
                ) : (
                  <FaUser />
                )}
              </div>
              <div className="d-none d-md-block me-2 text-start">
                <div className="fw-medium font-mont-gen text-dark  small ">
                  {auth?.LoginData?.userName}
                </div>
                <div className="text-muted font-mont-gen smaller">
                  {auth?.LoginData?.userEmail}
                </div>
              </div>
              {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu dropdown-menu-end show mt-2">
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="dropdown-item d-flex align-items-center"
                >
                  <FaUserEdit className="me-2" />
                  <span className="d-none d-sm-inline">Update Profile</span>
                </button>
                <button
                  onClick={() => navigate("/change-password")}
                  className="dropdown-item d-flex align-items-center"
                >
                  <FaCog className="me-2" />
                  <span className="d-none d-sm-inline">Change Password</span>
                </button>
                <button
                  onClick={logout}
                  className="dropdown-item text-danger d-flex align-items-center"
                >
                  <FaSignOutAlt className="me-2" />
                  <span className="d-none d-sm-inline">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

