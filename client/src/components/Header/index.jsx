import { Link } from "react-router-dom";
import Search from "../Search";
import { MdShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty, IoIosGitCompare } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import Badge from "../Reusables/Elements/Badge";
import { ReactSVG } from "react-svg";
import logo from "../../assets/logo.svg";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Navigation from "./Navigation";


const Header = () => {
  return (
    <header className="bg-white">
      <div className=" border-b-[1px] border-gray-200 ">
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
        <div className="header flex items-center w-[90%] mx-auto mt-2 pb-3 ">
          <Link to={"/"} className="col1-logo w-[25%] text-5xl">
            <ReactSVG src={logo} />
          </Link>
          <div className="col2-search w-[40%] items-center">
            <Search />
          </div>
          <div className="col3-items w-[35%] px-10">
            <div className="flex items-center gap-x-5 w-100 justify-center">
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
                    <Tooltip title="Cart">
                      <IconButton>
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
      <div className="border-b-[1px] border-gray-200 ">
        <Navigation />
      </div>
        
    </header>
  );
};

export default Header;
