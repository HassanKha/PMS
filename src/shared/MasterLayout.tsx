import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import "../styles/MasterLayout.css";


function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleCollapseSidebar = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth > 500);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <div className="min-vh-100 d-flex" style={{ backgroundColor: "#f8f9fa" }}>
        <div className='position-sticky top-0 vh-100'>
          <SideBar
            sidebarVisible={sidebarVisible}
            collapsed={collapsed}
            handleCollapseSidebar={handleCollapseSidebar}
          />
        </div>
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
