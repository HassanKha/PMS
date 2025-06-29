import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useContext } from "react";
import "../styles/Sidebar.css";

import HomeIcon from "../assets/DashboardSVG/SideBarIcons/HomeIcon.svg";
import UsersIcon from "../assets/DashboardSVG/SideBarIcons/UsersIcon.svg";
import ProjectsIcon from "../assets/DashboardSVG/SideBarIcons/ProjectsIcon.svg";
import TasksIcon from "../assets/DashboardSVG/SideBarIcons/TasksIcon.svg";
import ChevronLeftIcon from "../assets/DashboardSVG/SideBarIcons/ChevronLeftIcon.svg";
import ChevronRightIcon from "../assets/DashboardSVG/SideBarIcons/ChevronRightIcon.svg";

import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import type { SideBarProps } from "../interfaces/Dashboard";

const SideBar: React.FC<SideBarProps> = ({
  sidebarVisible,
  collapsed,
  handleCollapseSidebar,
}) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  const activeBg = { backgroundColor: "rgba(239, 155, 40, 0.3)" };

  return (
    <aside aria-label="Sidebar">

        <nav
      className={`col-auto sidebar d-lg-block ${sidebarVisible ? "d-block" : "d-none"}`}
    role="navigation"
      aria-label="Main sidebar"
    >
      <div className="sidbarContant">
        <Sidebar
          collapsed={collapsed}
          backgroundColor="#0E382F"
          width="270px"
          collapsedWidth="80px"
          className="side"
           aria-label="Sidebar navigation"
        >
          <div className="d-flex align-items-center justify-content-end">
            <button
            type="button"
              className="btn btn-sm sidebar-toggle-btn toggle-btn text-white d-none mb-0 d-lg-block"
              onClick={handleCollapseSidebar}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              aria-label="Toggle sidebar"
            >
              <img
                src={collapsed ? ChevronRightIcon : ChevronLeftIcon}
                alt={collapsed ? "Expand" : "Collapse"}
                width={18}
                height={18}
                loading="lazy"
                 role="presentation"
              />
            </button>

            <button
              type="button"
              className="btn btn-sm text-white sidebar-toggle-btn toggle-btn d-lg-none XIcon"
              onClick={handleCollapseSidebar}
              aria-label="Toggle sidebar on mobile"
              title="Toggle sidebar"
            >
              <img
                src={collapsed ? ChevronLeftIcon : ChevronRightIcon}
                alt="Toggle"
                width={18}
                height={18}
                loading="lazy"
                 role="presentation"
              />
            </button>
          </div>

          <Menu
            className={`mt-5 ${collapsed ? "menu-collapsed" : "menu-expanded"}`}
            aria-label="Sidebar Navigation"
          >
            <MenuItem
              icon={<img src={HomeIcon} alt="Home" width={18} height={18} loading="lazy"  role="presentation" />}
              component={<Link to="/dashboard" />}
              style={location.pathname === "/dashboard" ? activeBg : undefined}
              aria-current={location.pathname === "/dashboard" ? "page" : undefined}
            >
              Home
            </MenuItem>

            {auth?.LoginData?.roles[0] === "Manager" && (
              <MenuItem
                icon={<img src={UsersIcon} alt="Users" width={18} height={18} loading="lazy"  role="presentation" />}
                component={<Link to="/dashboard/users" />}
                style={location.pathname.startsWith("/dashboard/users") ? activeBg : undefined}
                aria-current={location.pathname.startsWith("/dashboard/users") ? "page" : undefined}
              >
                Users
              </MenuItem>
            )}

            <MenuItem
              icon={<img src={ProjectsIcon} alt="Projects" width={18} height={18} loading="lazy"  role="presentation" />}
              component={<Link to="/dashboard/projects" />}
              style={location.pathname.startsWith("/dashboard/projects") ? activeBg : undefined}
              aria-current={location.pathname.startsWith("/dashboard/projects") ? "page" : undefined}
            >
              Projects
            </MenuItem>

            <MenuItem
              icon={<img src={TasksIcon} alt="Tasks" width={18} height={18} loading="lazy"  role="presentation" />}
              component={<Link to="/dashboard/tasks" />}
              style={location.pathname.startsWith("/dashboard/tasks") ? activeBg : undefined}
              aria-current={location.pathname.startsWith("/dashboard/tasks") ? "page" : undefined}
            >
              Tasks
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </nav>
    </aside>
  
  );
};

export default SideBar;
