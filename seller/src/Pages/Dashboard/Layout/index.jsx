import React, { useState } from "react";
import Header from "../Header/index";
import SideBar from "../Sidebar/index";
import { Outlet } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import useData from "../../../hooks/useData";

const Layout = () => {
  const [sideBarOpened, setSideBarOpened] = useState(true);
  const { responseProgress } = useData();
  return (
    <>
      <div className="flex flex-row z-60 ">
        <div
          className={`shadow-md border-r border-gray-200 transition-all duration-300 min-h-screen  ${
            sideBarOpened ? "w-[18%]" : "w-[0%]  overflow-hidden"
          }`}
        >
          <SideBar />
        </div>
        <div
          className=" h-fit overflow-x-hidden"
          style={{ width: sideBarOpened ? "82%" : "100%" }}
        >
          <Header
            sidebarOpened={sideBarOpened}
            setSidebarOpened={setSideBarOpened}
          />
          <LinearProgress
            variant="determinate"
            color="warning"
            className="bg-white!"
            value={responseProgress}
          />
          <div className="z-40 relative w-full bg-[#f1f1f1] darkmode p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
