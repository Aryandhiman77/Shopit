import { Link } from "react-router-dom";
import Search from "../Search";
import { IoMdHeartEmpty, IoIosGitCompare } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import Badge from "../Reusables/Elements/Badge";
import { ReactSVG } from "react-svg";
import logo from "../../assets/logo.svg";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NavigationBar from "./Navigation";
import DrawerNavigation from "./Navigation/Drawer";
import CartPanel from "./Navigation/CartPanel";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AuthContext from "../../context/auth/AuthContext";

const Header = () => {
  const [cartPanelOpen, setCartPanelOpen] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
 
  return (
    <>
      <div className=" border-b-[1px] border-gray-200 bg-white">
        <div className="top-strip py-2 border-t-[1px] border-b-[1px] border-gray-200 text-gray-500">
          <div className="container max-w-screen-xl flex justify-between items-center mx-auto">
            <div className="col1 text-[14px] font-500">
              <p>
                Above 50% off on new season styles, grab it, limited time offer.
              </p>
            </div>
            <div className="col2">
              <ul className="flex gap-x-2 text-[14px] font-500">
                <li>
                  <Link
                    to={"/help-center"}
                    className="hover font-500 hover:text-primary transition-all"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header flex items-center w-[90%] mx-auto mt-2 pb-3  ">
          <Link to={"/"} className="col1-logo w-[25%] text-5xl">
            <ReactSVG src={logo} />
          </Link>
          <div className="col2-search w-[40%] items-center">
            <Search />
          </div>
          <div className="col3-items w-[35%] px-10">
            <div className="flex items-center gap-x-5 w-100 justify-center">
              {isAuthenticated ? (
                <Link
                  className="flex gap-3 items-center hover:bg-[#f0efefdd] active:bg-[#e5e5e5] p-2 rounded-xl"
                  to={"/myaccount"}
                >
                  <FaUserCircle className="text-3xl" />
                  <div>
                    <p className="font-[500] text-[12px] capitalize">
                      {user.name}
                    </p>
                    <p className="font-[400] text-[11px]"> {user?.email}</p>
                  </div>
                </Link>
              ) : (
                <div>
                  <Link
                    to={"/login"}
                    className="hover:text-primary transition-all"
                  >
                    Login
                  </Link>
                  &nbsp;|&nbsp;
                  <Link
                    to={"/register"}
                    className="hover:text-primary transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
              <div className="icons">
                <ul className="flex gap-x-5">
                  <li>
                    <Tooltip title="Compare">
                      <IconButton>
                        <Badge
                          value={2}
                          icon={<IoIosGitCompare className="text-2xl" />}
                        />
                      </IconButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Wishlist">
                      <IconButton>
                        <Badge
                          value={2}
                          icon={<IoMdHeartEmpty className=" text-2xl" />}
                        />
                      </IconButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Cart total: ₹ 3,999">
                      <IconButton
                        onClick={() => setCartPanelOpen(!cartPanelOpen)}
                      >
                        <Badge
                          value={2}
                          icon={<IoCartOutline className=" text-2xl" />}
                        />
                      </IconButton>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="bg-white sticky top-0 z-30">
        <div className="border-b-[1px] border-gray-200 ">
          <NavigationBar />
        </div>
      </header>
      <div className="cartPanel">
        <DrawerNavigation
          position={"right"}
          isDrawerOpen={cartPanelOpen}
          setDrawerOpen={setCartPanelOpen}
        >
          <CartPanel setDrawerOpen={setCartPanelOpen} />
        </DrawerNavigation>
      </div>
    </>
  );
};

export default Header;
