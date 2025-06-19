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
      <div className="min-vh-100 d-flex" style={{ backgroundColor: "#f8f9fa" }}>
        <div className='position-sticky top-0 vh-100'>
          {/* Bootstrap Navbar */}
          <SideBar
            sidebarVisible={sidebarVisible}
            collapsed={collapsed}
            handleCollapseSidebar={handleCollapseSidebar}
          />
        </div>

        {/* Sidebar Column */}

        <div className="w-100">
          <Navbar
            handleToggleSidebar={handleToggleSidebar}
            sidebarVisible={sidebarVisible}
          />
          <Outlet />
        </div>



      </div>
    </>
  );
}

export default MasterLayout;















































