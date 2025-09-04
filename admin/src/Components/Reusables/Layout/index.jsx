import React, { useState } from "react";
import Header from "../../Header";
import SideBar from "../../Sidebar";
import CollapsablePanel from "../CollapsablePanel";

const Layout = ({ children }) => {
  const [sideBarOpened, setSideBarOpened] = useState(true);
  return (
    <div>
      <div className="flex flex-row z-60">
        <div
          className={` shadow-md transition-all duration-300 ${
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
          <div className="z-40 relative w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
