import { useState, useContext, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

import MenuIcon from "../assets/DashboardSVG/NavBarIcons/MenuIcon.svg";
import CloseIcon from "../assets/DashboardSVG/NavBarIcons/CloseIcon.svg";
import BellIcon from "../assets/DashboardSVG/NavBarIcons/BellIcon.svg";
import UserIcon from "../assets/DashboardSVG/NavBarIcons/UserIcon.svg";
import ChevronDownIcon from "../assets/DashboardSVG/NavBarIcons/ChevronDownIcon.svg";
import ChevronUpIcon from "../assets/DashboardSVG/NavBarIcons/ChevronUpIcon.svg";
import CogIcon from "../assets/DashboardSVG/NavBarIcons/CogIcon.svg";
import SignOutIcon from "../assets/DashboardSVG/NavBarIcons/SignOutIcon.svg";
import UserEditIcon from "../assets/DashboardSVG/NavBarIcons/UserEditIcon.svg";

import PMSIcon from "../assets/PMS2.png";
import { AuthContext } from "../contexts/AuthContext";
import { ImageURL } from "../services/Urls";
const NotePopup = lazy(() => import("./NotePopup"));
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
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-outline-secondary me-3 d-lg-none"
            onClick={handleToggleSidebar}
          >
            <img
              src={sidebarVisible ? CloseIcon : MenuIcon}
              alt={sidebarVisible ? "Close Menu" : "Open Menu"}
              width={18}
              height={18}
              loading="lazy"
            />
          </button>
          <img
            src={PMSIcon}
            loading="lazy"
            alt="PMS Logo"
            style={{ height: 40 }}
          />
        </div>

        <Suspense fallback={null}>
          <NotePopup
            showPrivileges={showPrivileges}
            setShowPrivileges={setShowPrivileges}
          />
        </Suspense>

        <div className="d-flex align-items-center">
          <div className="mx-auto">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="notification-btn ntmtoggle"
              title="Toggle Dark Mode"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>

          <button
            type="button"
            className="btn btn-link text-secondary position-relative me-4 p-1 notification-btn d-none d-md-inline"
            onMouseEnter={() => setShowPrivileges(true)}
            onMouseLeave={() => setShowPrivileges(false)}
            onClick={() => setShowPrivileges(!showPrivileges)}
          >
            <img
              src={BellIcon}
              alt="Notifications"
              width={20}
              height={20}
              loading="lazy"
            />
            <span className="badge bg-danger notification-badge position-absolute top-0 start-100 translate-middle rounded-pill">
              1
            </span>
          </button>

          <div
            className="dropdown user-hover-box px-2"
            style={{ cursor: "pointer" }}
          >
            <div
              className="d-flex align-items-center"
              role="button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              tabIndex={0}
              onClick={toggleDropdown}
              onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
            >
              <div className="rounded-circle me-3 img-container text-white d-flex align-items-center justify-content-center">
                {auth?.CurrentUserData?.imagePath ? (
                  <img
                    loading="lazy"
                    src={`${ImageURL + auth?.CurrentUserData?.imagePath}`}
                    alt="Profile"
                    className="w-100 h-100 rounded-circle"
                  />
                ) : (
                  <img
                    src={UserIcon}
                    alt="User"
                    width={20}
                    height={20}
                    loading="lazy"
                  />
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
              <img
                src={dropdownOpen ? ChevronUpIcon : ChevronDownIcon}
                alt={dropdownOpen ? "Collapse Menu" : "Expand Menu"}
                width={12}
                height={12}
                loading="lazy"
              />
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu dropdown-menu-end show mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/profile")}
                  className="dropdown-item gap-2 d-flex align-items-center"
                >
                  <img
                    src={UserEditIcon}
                    alt="Edit Profile"
                    width={18}
                    height={18}
                    loading="lazy"
                  />
                  <span className="d-none d-sm-inline">Update Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/change-password")}
                  className="dropdown-item gap-2 d-flex align-items-center"
                >
                  <img
                    src={CogIcon}
                    alt="Settings"
                    width={18}
                    height={18}
                    loading="lazy"
                  />
                  <span className="d-none d-sm-inline">Change Password</span>
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="dropdown-item gap-2 text-danger d-flex align-items-center"
                >
                  <img
                    src={SignOutIcon}
                    alt="Sign Out"
                    width={18}
                    height={18}
                    loading="lazy"
                  />
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
