import React, { useEffect, useState } from "react";
import Header from "../../Header";
import SideBar from "../../Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Modal from "../Elements/Modal";
import OTPInput from "../OTPInput";
import { TextField } from "@mui/material";
import CollapsablePanel from "../CollapsablePanel";
import SessionRevalidationModel from "../../Modals/sessionRevalidationModel";

const Layout = () => {
  const [sideBarOpened, setSideBarOpened] = useState(true);
  
  //redirect provider after refresh
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const refreshSavedURL = sessionStorage.getItem("redirectToUrlAfterRefresh");
    if (refreshSavedURL) {
      navigate(refreshSavedURL);
    }
  }, []); // WILL BE EXECUTED ONLY ONCE AFTER PAGE LOAD

  useEffect(() => {
    sessionStorage.setItem("redirectToUrlAfterRefresh", location?.pathname);
  }, [location]); // WILL BE EXECUTED ON EVERY PAGE

  return (
    <>
      <div className="flex flex-row z-60 ">
        <div
          className={`shadow-md border-r-1 border-gray-200 transition-all duration-300 min-h-[100vh]  ${
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
          <div className="z-40 relative w-full bg-[#f1f1f1] darkmode p-4">
            <Outlet />
          </div>
        </div>
      </div>
      <SessionRevalidationModel />
    </>
  );
};

export default Layout;
