// MasterLayout.tsx
import React, { Suspense, useEffect, useState } from "react";
import Navbar from "./Navbar";
const SideBar = React.lazy(() => import("./SideBar"));
import { Outlet } from "react-router-dom";
import "../styles/MasterLayout.css";

function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const savedSidebarVisible = localStorage.getItem("sidebarVisible");
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");

    setSidebarVisible(
      savedSidebarVisible !== null
        ? savedSidebarVisible === "true"
        : window.innerWidth > 500
    );
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
        <Suspense
          fallback={<div style={{ width: collapsed ? 80 : 270 }}></div>}
        >
          <SideBar
            sidebarVisible={sidebarVisible}
            collapsed={collapsed}
            handleCollapseSidebar={handleCollapseSidebar}
          />
        </Suspense>
      </div>
      <div className="w-100" role="main">
        <Suspense fallback={null}>
          <Navbar
            handleToggleSidebar={handleToggleSidebar}
            sidebarVisible={sidebarVisible}
          />
        </Suspense>

        <Outlet />
      </div>
    </div>
  );
}

export default MasterLayout;
