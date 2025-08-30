import Divider from "@mui/material/Divider";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DrawerItems from "../DrawerItems";
import { useContext } from "react";
import DataContext from "../../../../../context/DataContext";
import Box from "@mui/material/Box";

const DrawerList = ({setDrawerOpen}) => {
  const { categories } = useContext(DataContext);
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <div className="flex justify-between items-center px-2 py-2">
        <h3 className="text-xl">Shop by Categories</h3>
        <IoCloseCircleOutline
          className="cursor-pointer text-2xl"
          onClick={() => setDrawerOpen(false)}
        />
      </div>
      <Divider />
      <div className="drawer_items">
        <ul className=" flex flex-col gap-y-3 font-[600] h-full">
          <DrawerItems items={categories} />
        </ul>
      </div>
    </Box>
  );
};
export default DrawerList;
