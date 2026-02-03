import Divider from "@mui/material/Divider";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DrawerItems from "../DrawerItems";
import { useContext } from "react";
import DataContext from "../../../../../context/data/DataContext";
import Box from "@mui/material/Box";
import { SkeletonText } from "../../../../Reusables/Elements/Loader/skeleton";

const DrawerList = ({ setDrawerOpen, categories = [], loading = false }) => {
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
          {loading ? (
            <div className="space-y-4 mt-4 mx-4">
              <SkeletonText width="30" className="h-6!" />
              <SkeletonText width="30" className="h-6!" />
              <SkeletonText width="30" className="h-6!" />
              <SkeletonText width="30" className="h-6!" />
              <SkeletonText width="30" className="h-6!" />
              <SkeletonText width="30" className="h-6!" />
            </div>
          ) : (
            <DrawerItems items={categories} />
          )}
        </ul>
      </div>
    </Box>
  );
};
export default DrawerList;
