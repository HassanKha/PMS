// MasterLayout.tsx
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import "../styles/MasterLayout.css";

function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  
  useEffect(() => {
    const savedSidebarVisible = localStorage.getItem("sidebarVisible");
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");

    setSidebarVisible(savedSidebarVisible !== null ? savedSidebarVisible === "true" : window.innerWidth > 500);
    setCollapsed(savedCollapsed === "true");

    const handleResize = () => {
      if (localStorage.getItem("sidebarVisible") === null) {
        setSidebarVisible(window.innerWidth > 500);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const handleToggleSidebar = () => {
    const newState = !sidebarVisible;
    setSidebarVisible(newState);
    localStorage.setItem("sidebarVisible", newState.toString());
  };

  const handleCollapseSidebar = () => {
    const newCollapse = !collapsed;
    setCollapsed(newCollapse);
    localStorage.setItem("sidebarCollapsed", newCollapse.toString());
  };

  return (
    <div className="min-vh-100 d-flex" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="position-sticky top-0 vh-100">
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
  );
}

export default MasterLayout;
