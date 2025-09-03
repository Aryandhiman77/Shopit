import { Divider, MenuItem } from "@mui/material";
import { IoLogOutOutline, IoSettings } from "react-icons/io5";
import {
  MdOutlineMenuOpen,
  MdOutlineMenu,
  MdAccountCircle,
  MdDocumentScanner,
} from "react-icons/md";
import { PiCommandBold } from "react-icons/pi";
import avatar from "../../assets/avatar.webp";
import CustomMenu from "../Reusables/CustomMenu";
import MButton from "../Reusables/Elements/MButton";
import Search from "../Reusables/Search";

const Header = ({ sidebarOpened, setSidebarOpened }) => {
  //   const [isSideBarOpen, setSideBarOpen] = useState(false);
  return (
    <div className="w-full flex flex-row justify-between items-center p-4 z-50 relative">
      <div className="part-1 flex gap-5 ">
        <button
          className="custom-btn custom-border text-xl text-gray-600"
          onClick={() => setSidebarOpened(!sidebarOpened)}
        >
          {sidebarOpened ? <MdOutlineMenuOpen /> : <MdOutlineMenu />}
        </button>
        <Search
          endIcon={
            <code className="flex flex-row items-center bg-blue-500 rounded-lg px-2 text-white text-sm">
              <PiCommandBold />K
            </code>
          }
          placeholder={"Search your page ..."}
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="custom-btn custom-border">
<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-[22px] w-auto animate-spin-slow"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-current opacity-30"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              className="fill-current"
            ></path>
          </svg>
        </button>
        <button className="custom-btn custom-border ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19 19"
            fill="none"
            className="h-[22px] w-auto"
          >
            <path
              className="fill-current opacity-40"
              d="M16.172 5.313h-.375v3.562a3.19 3.19 0 0 1-3.187 3.188H3.798v1.687c0 1.137.925 2.062 2.062 2.062h.937V17.5a.562.562 0 0 0 .977.38l1.895-2.068h6.503a2.064 2.064 0 0 0 2.062-2.062V7.375a2.065 2.065 0 0 0-2.062-2.063Z"
            ></path>
            <path
              fill="currentColor"
              d="M12.61.813H1.734A1.69 1.69 0 0 0 .047 2.5v6.375c0 .93.757 1.688 1.688 1.688H12.61a1.69 1.69 0 0 0 1.688-1.688V2.5A1.691 1.691 0 0 0 12.609.812Zm.187 3.33L7.742 6.595a1.273 1.273 0 0 1-1.14 0L1.547 4.143V2.897L7.09 5.584c.053.03.112.03.165 0l5.543-2.686-.001 1.244Z"
            ></path>
          </svg>
        </button>
        <button className="custom-btn custom-border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
            className="h-[22px] w-auto"
          >
            <path
              className="fill-current opacity-40"
              d="M16.5 8.162a.75.75 0 0 1-.75-.75 7.824 7.824 0 0 0-2.306-5.569.75.75 0 0 1 1.06-1.06 9.315 9.315 0 0 1 2.746 6.629.752.752 0 0 1-.75.75ZM1.5 8.162a.75.75 0 0 1-.751-.75c0-2.505.975-4.86 2.746-6.63a.751.751 0 0 1 1.061 1.06 7.824 7.824 0 0 0-2.306 5.57.75.75 0 0 1-.75.75Z"
            ></path>
            <path
              fill="currentColor"
              d="M16.034 12.684A5.025 5.025 0 0 1 14.25 8.84V6.75c0-2.64-1.96-4.824-4.5-5.19V.75a.75.75 0 1 0-1.5 0v.81c-2.54.366-4.5 2.55-4.5 5.19v2.091c0 1.484-.65 2.885-1.792 3.85a1.312 1.312 0 0 0 .854 2.31h12.375a1.314 1.314 0 0 0 .847-2.317Z"
            ></path>
            <path
              className="fill-current opacity-40"
              d="M9 18a2.816 2.816 0 0 0 2.755-2.25H6.244A2.818 2.818 0 0 0 9 18Z"
            ></path>
          </svg>
        </button>
        <div>
          <CustomMenu
            title={<img src={avatar} alt="" height={40} width={40} />}
            btnClasses={
              "shadow-md bg-black rounded-full"
            }
          >
            <div className="flex flex-row gap-4 p-4">
              <img src={avatar} alt="" height={45} width={45} />
              <div>
                <p className="font-[600] text-black text-sm">Aryan dhiman</p>
                <p className="font-[400] text-black text-[13px]">
                  aryandhiman015@gmail.com
                </p>
              </div>
            </div>
            <Divider />
            <div className="p-2">
              <MButton title="My Profile" startIcon={<MdAccountCircle className="text-xl"/>} />
              <MButton title="Account Settings" startIcon={<IoSettings className="text-xl"/>}/>
              <MButton title="Account logs" startIcon={<MdDocumentScanner className="text-xl"/>} />
            </div>
            <Divider />
            <MenuItem className="flex flex-row gap-3 custom-btn !shadow-none">
              <IoLogOutOutline />
              Logout
            </MenuItem>
          </CustomMenu>
        </div>
      </div>

    </div>
  );
};

export default Header;
