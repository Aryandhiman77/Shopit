import React from "react";
import Table from "../../Table";
import UserRow from "../../Table/UserRow";
import { PiExport, PiPlus } from "react-icons/pi";
import BreadCrumb from "../../Reusables/Elements/BreadCrumb";
import Search from "../../Reusables/Search";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-[700] text-black">Users</h1>
          <BreadCrumb addBreadCrumb={"List"} />
        </div>
        <div className="flex flex-row gap-2">
          <Link
            to={"/"}
            className="custom-btn custom-border flex items-center gap-2 !bg-green-600 !text-white text-sm font-[500]"
          >
            <PiExport />
            Export{" "}
          </Link>
        </div>
      </div>
      <div className="w-[20%]">
        <Search placeholder={"Search User ..."} />
      </div>
      <Table
        attributes={[
          "UUID",
          "User Name",
          "email",
          "phone no.",
          "Block",
          "created At",
          "Modified At",
          "operations",
        ]}
      >
        <UserRow
          user={{
            UUID: "142090",
            username: "Aryan Dhiman",
            email: "aryandhiman015@gmial.com",
            phoneNumber: "8053566803",
            status: "active",
            createdAt: "September 5, 2025",
            modifiedAt: "September 5, 2025",
          }}
        />
      </Table>
    </div>
  );
};

export default Users;
