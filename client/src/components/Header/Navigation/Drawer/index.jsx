import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DrawerItems from "./DrawerItems";

const DrawerNavigation = ({ isDrawerOpen, setDrawerOpen,position,children }) => {
  
  return (
    <div>
      <Drawer anchor={position} open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        {children}
      </Drawer>
    </div>
  );
};
export default DrawerNavigation;
