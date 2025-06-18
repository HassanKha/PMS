
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faTimes,
  faBell,

  faUser,

  faChevronDown,
  faChevronUp,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"
import PMSIcon from "../assets/PMS2.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface NavbarProps {
  handleToggleSidebar: () => void;
  sidebarVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ handleToggleSidebar, sidebarVisible }) => {
 
 const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
  }

    let navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

    const auth = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
          <div className="container-fluid">
            <div className="d-flex align-items-center ">
              {/* Mobile menu button */}
              <button className="btn btn-outline-secondary me-3 d-lg-none XIcon" onClick={handleToggleSidebar}>
                <FontAwesomeIcon icon={sidebarVisible ? faTimes : faBars} />
              </button>
                  <img src={PMSIcon} alt="PMSIcon" className="navbar-brand mb-0 h1" />
            </div>

            {/* Right side navbar items */}
            <div className="d-flex justify-content-center align-items-center">
              {/* Notification Icon */}
              <div className="position-relative me-4">
                <button className="btn btn-link text-secondary p-1 position-relative">
                  <FontAwesomeIcon icon={faBell} size="lg"  style={{ color: "#EF9B28" }} />
                  <span style={{ background: "#EF9B28" , border : "solid 1px" , boxShadow:"0 4px 10px rgba(0, 0, 0, 0.5)" }} className="position-absolute top-0   start-100 translate-middle badge rounded-5 ">
                    1
                  </span>
                </button>
              </div>

              {/* Profile Section */}
              <div className="dropdown">
                <div
                  className="d-flex align-items-center cursor-pointer"
                  onClick={toggleProfileDropdown}
                  style={{ cursor: "pointer" }}
                >
                  {/* Profile Picture */}
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#20c997",
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </div>

                  {/* Name and Email - Hidden on small screens */}
                  <div className="d-none d-md-block me-2">
                    <div className="fw-medium text-dark mb-0" style={{ fontSize: "14px", lineHeight: "1.2" }}>
                    {auth?.LoginData?.userName}
                    </div>
                    <div className="text-muted" style={{ fontSize: "12px", lineHeight: "1.2" }}>
                      {auth?.LoginData?.userEmail}
                    </div>
                  </div>

                  {/* Toggle Icon */}
                  <button className="btn btn-link text-secondary p-1">
                    <FontAwesomeIcon icon={profileDropdownOpen ? faChevronUp : faChevronDown} size="sm" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-end show position-absolute"
                    style={{
                      top: "100%",
                      right: "0",
                      zIndex: 1050,
                      minWidth: "250px",
                      marginTop: "8px",
                    }}
                  >
                    {/* Mobile Profile Info - Only visible on small screens */}
                    <div className="d-md-none px-3 py-2 border-bottom">
                      <div className="fw-medium text-dark">Upskilling</div>
                      <div className="text-muted small">upskilling.egt@gmail.com</div>
                    </div>

                    <div className="px-3 py-2 Setting">
                      <button onClick={()=> navigate('/change-password')} className="btn btn-link text-start p-0 w-100 d-flex align-items-center text-decoration-none">
                        <FontAwesomeIcon icon={faCog} className="me-2 text-secondary" />
                        <span >Change Password</span>
                      </button>
                    </div>

                    <hr className="dropdown-divider" />

                    <div className="px-3 py-2">
                      <button onClick={logout} className="btn btn-link logout-btn text-start p-0 w-100 d-flex align-items-center text-decoration-none">
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2 text-danger" />
                        <span className="text-danger">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

  )
}

export default Navbar