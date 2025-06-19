import { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import "../styles/MasterLayout.css"; // Adjust the path as necessary


function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleCollapseSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
        {/* Bootstrap Navbar */}
        <Navbar
          handleToggleSidebar={handleToggleSidebar}
          sidebarVisible={sidebarVisible}
        />

        <div className="container-fluid p-0">
          <div className="d-flex g-0">
            {/* Sidebar Column */}
            <SideBar
              sidebarVisible={sidebarVisible}
              collapsed={collapsed}
              handleCollapseSidebar={handleCollapseSidebar}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterLayout;
