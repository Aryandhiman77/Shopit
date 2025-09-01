import { BsThreeDotsVertical } from "react-icons/bs";
import MenuItem from "@mui/joy/MenuItem";
import Menu from "@mui/joy/Menu";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import { MdEdit, MdDelete } from "react-icons/md";

const AddressItem = ({address}) => {
  return (
    <div className="address-item border-[1px] border-[#a0a0a0] border-dashed p-5 rounded-md bg-[#fafafa] hover:bg-gray-100 cursor-pointer text-sm font-[500] text-gray-600 w-full my-2">
      <div className="flex justify-between items-center">
        <div className="bg-[#e5e5e5] p-1 rounded-md text-[12px]">{address.type}</div>
        <Dropdown>
          <MenuButton className="!border-0">
            <BsThreeDotsVertical className="text-lg" />
          </MenuButton>
          <Menu>
            <MenuItem>
              <MdEdit /> Edit
            </MenuItem>
            <MenuItem>
              <MdDelete />
              Delete
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div className="flex gap-5 font-[600] pt-2">
        <p>{address.fullName}</p>
        <span className="">{address.phoneNumber}</span>
      </div>
      <div className="flex gap-5 font-[400] pt-1">
        <p>{address.fullAddress}</p>
      </div>
    </div>
  );
};

export default AddressItem;
