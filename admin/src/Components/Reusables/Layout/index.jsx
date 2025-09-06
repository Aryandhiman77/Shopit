import React, { useState } from "react";
import Header from "../../Header";
import SideBar from "../../Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sideBarOpened, setSideBarOpened] = useState(true);

  return (
    <div>
      
      <div className="flex flex-row z-60 ">
        <div
          className={`shadow-md border-r-1 border-gray-200 transition-all duration-300  ${ 
            sideBarOpened ? "w-[18%]" : "w-[0%]  overflow-hidden"
          }`}
        >
          <SideBar />
        </div>
        <div className=" h-fit overflow-x-hidden" style={{width:sideBarOpened?"82%":"100%"}}>
          <Header
            sidebarOpened={sideBarOpened}
            setSidebarOpened={setSideBarOpened}
          />
          <div className="z-40 relative w-full bg-[#f1f1f1] darkmode">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
