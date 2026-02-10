import { MenuItem } from "@mui/material";
import Spinner from "../../Reusables/Elements/Loader/Spinner";

const MenuItems = ({ data = [], loading }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center h-20">
        <Spinner size={30} />
      </div>
    );
  else {
    return data?.map((item, i) => (
      <MenuItem key={`menuitem-${i}`} className="capitalize" value={item?._id}>
        {item?.name}
      </MenuItem>
    ));
  }
};

export default MenuItems;
