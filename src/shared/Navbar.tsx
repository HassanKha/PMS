import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faBell,
  faUser,
  faChevronDown,
  faChevronUp,
  faCog,
  faSignOutAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import PMSIcon from "../assets/PMS2.png";
import { AuthContext } from "../contexts/AuthContext";
import { ImageURL } from "../services/Urls";

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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary me-3 d-lg-none"
            onClick={handleToggleSidebar}
          >
            <FontAwesomeIcon icon={sidebarVisible ? faTimes : faBars} />
          </button>
          <img src={PMSIcon} alt="PMSIcon" style={{ height: 40 }} />
        </div>

        <div className="d-flex align-items-center ">
          <button className="btn btn-link text-secondary position-relative me-4 p-1">
            <FontAwesomeIcon
              icon={faBell}
              size="lg"
              style={{ color: "#EF9B28" }}
            />
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
              1
            </span>
          </button>

          <div className="dropdown user-hover-box  px-2 " style={{cursor:"pointer"}}>
            <div
              className="d-flex align-items-center "
              onClick={toggleDropdown}
            >
              <div
                className="rounded-circle me-3 text-white d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, backgroundColor: "#20c997" }}
              >
                {auth?.CurrentUserData?.imagePath ? (
                  <img
                    src={`${ImageURL + auth?.CurrentUserData?.imagePath}`}
                    alt="profile Pic"
                    className="w-100 h-100  rounded-circle"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
              <div className="d-none d-md-block me-2 text-start">
                <div className="fw-medium font-mont-gen text-dark small">
                  {auth?.LoginData?.userName}
                </div>
                <div className="text-muted font-mont-gen smaller">
                  {auth?.LoginData?.userEmail}
                </div>
              </div>
              <FontAwesomeIcon
                icon={dropdownOpen ? faChevronUp : faChevronDown}
              />
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu dropdown-menu-end show mt-2 ">
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="dropdown-item d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                  <span className="d-none d-sm-inline">Update Profile</span>
                </button>
                <button
                  onClick={() => navigate("/change-password")}
                  className="dropdown-item d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faCog} className="me-2" />
                  <span className="d-none d-sm-inline">Change Password</span>
                </button>
                <button
                  onClick={logout}
                  className="dropdown-item text-danger d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  <span className="d-none SignOut d-sm-inline">Sign Out</span>
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
