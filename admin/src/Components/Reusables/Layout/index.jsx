import React from "react";
import Header from "../../Header";
import SideBar from "../../Sidebar";

const Layout = ({children}) => {
  return (
    <div>
      <div className="flex flex-row">
        
        <div className="w-[20%] shadow-md h-[100vh] ">
          <SideBar />
        </div>
        <div className="w-full h-full">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
