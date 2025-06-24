import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Sidebar.css";
import {
  faUsers,
  faTh,
  faChevronLeft,
  faChevronRight,
  faHome,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
interface SideBarProps {
  sidebarVisible: boolean;
  collapsed: boolean;
  handleCollapseSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  sidebarVisible,
  collapsed,
  handleCollapseSidebar,
}) => {

  const auth = useContext(AuthContext);
 

    const location = useLocation();
  const activeBg = { backgroundColor: "rgba(239, 155, 40, 0.3)" };

  return (
    <div
      className={`col-auto sidebar d-lg-block ${sidebarVisible ? "d-block" : "d-none"}`}

    >
      <div className="sidbarContant  ">
        <Sidebar
          collapsed={collapsed}
          className="side"
          backgroundColor="#0E382F"
          width="270px"
          collapsedWidth="80px"
          style={{
            height: "calc(100vh - 56px)",
            border: "none",
            boxShadow: "2px 0 6px rgba(0,21,41,.35)",
          }}
        >
       
          <div
            className="d-flex align-items-center justify-content-end "
           
          >
            <button
              className="btn btn-sm sidebar-toggle-btn toggle-btn text-white d-none mb-0 d-lg-block"
              onClick={handleCollapseSidebar}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <FontAwesomeIcon
                icon={collapsed ? faChevronRight : faChevronLeft}
                size="sm"
              />
            </button>
            <button
              className="btn btn-sm text-white sidebar-toggle-btn toggle-btn d-lg-none XIcon"
              onClick={handleCollapseSidebar}
             
            >
             <FontAwesomeIcon
                icon={collapsed ? faChevronLeft: faChevronRight}
                size="sm"
              />
            </button>
          </div>

          <Menu
            menuItemStyles={{
              button: {
                color: "#ffffff",
                margin: collapsed ? "0 0 5px 0" : "0px 15px 5px 15px",
                borderRadius: "8px"
              },
              subMenuContent: {
                backgroundColor: "#2c3136",
              },
            }}
            className="mt-5"
          >
            <MenuItem
              icon={<FontAwesomeIcon icon={faHome} />}
              component={<Link to="/dashboard" />}
              className=""
            style={location.pathname === "/dashboard" ? activeBg : undefined}
            >
              Home
            </MenuItem>
            {
              auth?.LoginData?.roles[0]
                === "Manager" ?
                <MenuItem icon={<FontAwesomeIcon icon={faUsers}/>}
                  component={<Link to="/dashboard/users" />}
              style={location.pathname.startsWith("/dashboard/users") ? activeBg : undefined}
                >
                  Users
                </MenuItem>
                : ''
            }

            <MenuItem
              icon={<FontAwesomeIcon icon={faTh} />}
                  component={<Link to="/dashboard/projects" />}
            style={location.pathname.startsWith("/dashboard/projects") ? activeBg : undefined}
            >
              Projects
            </MenuItem>

            <MenuItem
              icon={<FontAwesomeIcon icon={faTasks} />}
               component={<Link to="/dashboard/tasks" />}
            style={location.pathname.startsWith("/dashboard/tasks") ? activeBg : undefined}
            >
              Tasks
            </MenuItem>

          </Menu>
        </Sidebar>
      </div>
    </div>
  );
};

export default SideBar;
