import React, { useEffect } from "react";
import BreadCrumb from "../../Components/Reusables/Elements/BreadCrumb";
import Box from "../../Components/Reusables/Elements/Box";
import CustomButton from "../../Components/Reusables/Elements/CustomBtn";
import Search from "../../Components/Reusables/Search";
import DropDownField from "../../Components/Reusables/DropDownField";
import useBrands from "../../Components/hooks/useBrands";
import { PiExport, PiPlus } from "react-icons/pi";
import { Tooltip } from "@mui/material";
import { CiExport, CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { Divider } from "@mui/material";
import BrandRow from "../../Components/Table/BrandRow";
import Spinner from "../../Components/Reusables/Elements/Loader/Spinner";
import Table from "../../Components/Table";
import NoBrands from "../../assets/noBrands.png";
// import BrandForm from "../../Components/BrandForm";

const BrandList = () => {
  const { brands, getBrands, loading } = useBrands();

  const handleEdit = (id) => {
    console.log(id);
  };

  useEffect(() => {
    getBrands(10, 1);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <BreadCrumb addBreadCrumb={"List"} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className=" font-semibold text-2xl">Brands</p>
          <div className="flex gap-3 items-center">
            <CustomButton
              type={"button"}
              title={
                <Tooltip title="Export file">
                  <div className="flex gap-1 items-center">
                    <CiExport size={17} />
                    Export
                  </div>
                </Tooltip>
              }
              className="custom-btn custom-border flex items-center gap-2 !bg-transparent text-black! text-sm font-[500] border! border-gray-400! rounded-md! hover:text-black!"
              fontSize={12}
              textPadding={1}
              fontWeight={500}
            />
            <CustomButton
              // disabled={true}
              onClick={() => navigate("/categories/add")}
              type="button"
              className="custom-btn custom-border flex items-center gap-2 !bg-red-400 text-sm font-[500] rounded-md! hover:text-white!"
              title={
                <Tooltip title="Delete Brand">
                  <div className="flex gap-1 items-center">
                    <CiTrash size={20} />
                    Delete
                  </div>
                </Tooltip>
              }
              fontSize={12}
              textPadding={1}
              fontWeight={500}
            />
            <CustomButton
              // disabled={true}
              onClick={() => navigate("/categories/add")}
              type="button"
              className="custom-btn custom-border flex items-center gap-2 !bg-orange-400 text-sm font-[500] rounded-md! hover:text-white!"
              title={
                <Tooltip title="Edit Multiple Brands">
                  <div className="flex gap-1 items-center">
                    <FaRegEdit size={20} />
                    Bulk Edit
                  </div>
                </Tooltip>
              }
              fontSize={12}
              textPadding={1}
              fontWeight={500}
            />
            <CustomButton
              onClick={() => navigate("/categories/add")}
              type="button"
              className="custom-btn custom-border flex items-center gap-2 !bg-blue-500 text-sm font-[500] rounded-md! hover:text-white!"
              title={
                <Tooltip title="Add New Brand">
                  <div className="flex gap-1 items-center">
                    <PiPlus size={17} />
                    Add Brand
                  </div>
                </Tooltip>
              }
              fontSize={12}
              textPadding={1}
              fontWeight={400}
            />
          </div>
        </div>
        <Box className="space-y-4 bg-white dark:bg-black rounded-sm!">
          <div className="flex justify-between items-center gap-3 py-2">
            <div className="flex gap-5  w-[80vw] max-w-[90vw]">
              <div className="w-[60%] flex items-center gap-4">
                <Search
                  placeholder={"Search Brands ..."}
                  onSearch={(value) => console.log(value)}
                />

                <button className="custom-btn flex items-center gap-2 !bg-transparent text-sm font-[500] rounded-md! hover:text-black! border! border-gray-400 text-gray-700">
                  <Tooltip title="Reset Filters">
                    <div className="flex gap-1 items-center">
                      <RiResetLeftFill size={17} />
                      <p>Reset</p>
                    </div>
                  </Tooltip>
                </button>
              </div>
              <div className="w-30">
                <DropDownField
                  defaultSelected={"All"}
                  items={[
                    "All",
                    "Main Categories",
                    "Sub Categories",
                    "Leaf Categories",
                  ]}
                />
              </div>
              <div className="w-30">
                <DropDownField
                  defaultSelected={"Both"}
                  items={["Both", "Active", "Inactive"]}
                />
              </div>
            </div>
            <p className="text-gray-500 font-normal text-sm px-2 w-[10vw] max-w-[20vw] text-right text-nowrap">
              {brands?.length ? <>Results : {brands?.length}</> : ""}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-4">
              <Spinner size={40} />
            </div>
          ) : brands?.length > 0 ? (
            <Table
              attributes={[
                "Id",
                "Logo",
                "Brand Name",
                "Cateogories",
                "Status",
                "Created At",
                "Modified At",
                "Operations",
              ]}
            >
              {brands.map((brand, i) => (
                <BrandRow
                  brand={brand}
                  handleEdit={handleEdit}
                  index={i}
                  key={`Brand-${i}`}
                />
              ))}
            </Table>
          ) : (
            <div className="text-center text-gray-500 font-semibold">
              <img
                src={NoBrands}
                alt="No brands found."
                className="w-100 h-auto mx-auto"
              />
            </div>
          )}
        </Box>
      </div>
      {/* <BrandForm /> */}
    </>
  );
};

export default BrandList;
