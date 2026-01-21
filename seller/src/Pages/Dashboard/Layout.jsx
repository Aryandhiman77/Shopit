import React from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./Header";

const Layout = ({ children }) => {
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
