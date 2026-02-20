import React, { useEffect } from "react";
import Table from "../../Components/Table";
import UserRow from "../../Components/Table/UserRow";
import { PiExport, PiPlus } from "react-icons/pi";
import BreadCrumb from "../../Components/Reusables/Elements/BreadCrumb";
import Search from "../../Components/Reusables/Search";
import { Link } from "react-router-dom";
import useUsers from "../../Components/hooks/useUsers";
import Spinner from "../../Components/Reusables/Elements/Loader/Spinner";
import Box from "../../Components/Reusables/Elements/Box";
import CustomButton from "../../Components/Reusables/Elements/CustomBtn";
import { Divider } from "@mui/material";
import useAuth from "../../Components/hooks/useAuth";

const Users = () => {
  const { users, getAllUsers, loading } = useUsers();
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <BreadCrumb />
      </div>
      <Box className="space-y-4 bg-white dark:bg-black">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 font-semibold text-xl">Users</p>
          <div className="flex gap-3 items-center">
            <CustomButton
              type={"button"}
              title={
                <>
                  <PiExport />
                  Export
                </>
              }
              className="custom-btn custom-border flex items-center gap-2 !bg-green-600 !text-white text-sm font-[500]"
              fontSize={12}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[20%]">
            <Search placeholder={"Search Category ..."} />
          </div>
          <p className="text-gray-500 font-normal text-sm px-2">
            {users?.length ? <>Results : {users?.length}</> : ""}
          </p>
        </div>

        <Divider className="mb-4!" />
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <Spinner size={40} />
          </div>
        ) : users?.length > 0 ? (
          <Table
            attributes={[
              "UUID",
              "User Name",
              "email",
              "phone no.",
              "role",
              "Active",
              "Email Verified",
              "Phone Number Verified",
              "Created At",
              "Modified At",
              "Login users Count",
              "Login Attempts",
              "Suspended Count",
              "Suspension Expires",
              // "operations",
            ]}
          >
            {users.map((user, i) => (
              <UserRow key={`User-${i}`} user={user} />
            ))}
          </Table>
        ) : (
          <div className="text-center text-gray-500 font-semibold">
            No Users found.
          </div>
        )}
      </Box>
    </div>
  );
};

export default Users;
