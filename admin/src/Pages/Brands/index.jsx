import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Reusables/Elements/BreadCrumb";
import Box from "../../Components/Reusables/Elements/Box";
import CustomButton from "../../Components/Reusables/Elements/CustomBtn";
import Search from "../../Components/Reusables/Search";
import DropDownField from "../../Components/Reusables/DropDownField";
import useBrands from "../../Components/hooks/useBrands";
import useFilters from "../../Components/hooks/useFilters";
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
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Reusables/Elements/Modal";
import BrandForm from "../../Components/BrandForm";
import BrandFilters from "../../Components/Filters/BrandFilters";
import PaginationFilter from "../../Components/Filters/Pagination";

const ITEMS_PER_PAGE = 5;
const defaultFilters = {
  page: 1,
  limit: ITEMS_PER_PAGE,
  sortOrder: "desc",
};

const BrandList = () => {
  const { brands, getBrands, loading } = useBrands();
  const { filters, handleOnChange, resetFilters, query } = useFilters();
  const [editMode, setEditMode] = useState(false);
  const [updationDetails, setUpdationDetails] = useState(null);
  const navigate = useNavigate();
  const handleEdit = (id) => {
    const brandToBeUpdated = brands?.brands?.filter(
      (item) => item._id === id,
    )[0];
    if (brandToBeUpdated) {
      setEditMode(true);
      setUpdationDetails(brandToBeUpdated);
    }
  };
  useEffect(() => {
    if (filters.limit && filters.page) {
      getBrands(`?${query}`);
    }
  }, [filters]);
  useEffect(() => {
    handleOnChange(defaultFilters);
    return () => {
      resetFilters();
    };
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
        <BrandFilters
          handleOnChange={handleOnChange}
          onReset={() => {
            resetFilters();
            handleOnChange(defaultFilters);
          }}
        />
        <p className="text-right px-3 text-[12px]">
          Total Results :{" "}
          <span className="font-semibold">{brands?.totalResults}</span>
        </p>
        <Box className="space-y-4 bg-white dark:bg-black rounded-sm!">
          {loading ? (
            <div className="flex justify-center items-center p-4">
              <Spinner size={40} />
            </div>
          ) : brands?.brands?.length > 0 ? (
            <>
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
                {brands?.brands?.map((brand, i) => (
                  <BrandRow
                    brand={brand}
                    handleEdit={handleEdit}
                    index={i}
                    key={`Brand-${i}`}
                  />
                ))}
              </Table>
            </>
          ) : (
            <div className="text-center text-gray-500 font-semibold">
              <img
                src={NoBrands}
                alt="No brands found."
                className="w-100 h-auto mx-auto dark:invert-100"
              />
            </div>
          )}
          <PaginationFilter
            getPage={(page) => {
              handleOnChange({ page });
            }}
            currentPage={brands?.page ? brands.page : 1}
            totalPages={brands?.totalPages}
          />
        </Box>
      </div>
      {
        <Modal
          open={editMode}
          setOpen={setEditMode}
          title={`Update brand`}
          fixedFullScreen={false}
        >
          <div className="p-10 ">
            <BrandForm
              mode="edit"
              updationBrand={updationDetails}
              setEditModal={setEditMode}
            />
          </div>
        </Modal>
      }
    </>
  );
};

export default BrandList;
