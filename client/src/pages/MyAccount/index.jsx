import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import user from "../../assets/user-image.jpg";
import { Link } from "react-router-dom";
import ScrollTab from "../../components/Reusables/ScrollTab";
import Profile from "./Tabs/Profile";
import CollapsablePanel from "../../components/Reusables/CollapsablePanel";
import Wishlist from "./Tabs/Wishlist";
import MyOrders from "./Tabs/MyOrders";
import Address from "./Tabs/Address";
const MyAccount = () => {
  const items = ["My Profile", "Address", "Wishlist", "My Orders", "Logout"];
  const [tabActive, setTabActive] = useState(0);
  const tabs = [
  <Profile key="profile" />,
  <Address key="address" />,
  <Wishlist key="wishlist" />,
  <MyOrders key="orders" />
];

  return (
    <div className="flex flex-row gap-5 max-w-screen-xl mx-auto mt-10  ">
      <div className="sidebar w-[20%] rounded-sm  bg-white shadow-lg h-fit sticky top-20">
        <div className="user-info-header h-50 w-full flex items-center justify-center flex-col text-center">
          <img
            className="h-25 w-25 rounded-full shadow-2xl border-[1px] border-[#e5e5e5]"
            src={user}
            alt=""
          />
          <Link
            className="flex gap-3 items-center hover:bg-[#f0efefdd] active:bg-[#e5e5e5] p-2 rounded-xl"
            to={"/myaccount"}
          >
            <div>
              <p className="font-[500] text-[12px]">Aryan Dhiman</p>
              <p className="font-[400] text-[11px]">aryandhiman015@gmail.com</p>
            </div>
          </Link>
        </div>
        <Divider />
        <ScrollTab
          orientation="vertical"
          items={items}
          bg={"#e5e5e5"}
          setActive={setTabActive}
        />
      </div>
      <div className="information w-[50%] bg-white h-fit rounded-sm shadow-lg">
        <CollapsablePanel isOpened={tabActive>-1}>
          {/* {tabActive === 0 && <Profile />}
          {tabActive === 1 && <Address />}
          {tabActive === 2 && <Wishlist />}
          {tabActive === 3 && <MyOrders />} */}
          { 
            tabs.map((tab,i)=>(
                tabActive===i && tab
            ))
          }
        </CollapsablePanel>
      </div>
    </div>
  );
};

export default MyAccount;
