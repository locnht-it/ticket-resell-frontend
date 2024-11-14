import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarVisible ? "block" : "hidden"
        } h-full w-60 transition-all duration-300 bg-neutral-900`}
      >
        <Sidebar />
      </div>

      {/* Phần chính bao gồm Header và nội dung */}
      <div
        className={`flex flex-col h-full flex-1 transition-all duration-300 ${
          isSidebarVisible ? "ml-0" : "ml-0"
        }`}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Nội dung */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
