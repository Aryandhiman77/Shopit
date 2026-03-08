import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table";
import CategoryRow from "../../../Components/Table/CategoryRow";
import { Link, useNavigate } from "react-router-dom";
import { PiExport, PiPlus, PiTrash } from "react-icons/pi";
import Search from "../../../Components/Reusables/Search";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import useCategory from "../../../Components/hooks/useCategory";
import Box from "../../../Components/Reusables/Elements/Box";
import { Divider, Tooltip } from "@mui/material";
import CustomButton from "../../../Components/Reusables/Elements/CustomBtn";
import Spinner from "../../../Components/Reusables/Elements/Loader/Spinner";
import UpdateCategoryModal from "../../../Components/Reusables/Elements/Modal";
import Modal from "../../../Components/Reusables/Elements/Modal";
import CategoryForm from "../../../Components/CategoryForm/CategoryForm";
import DropDownField from "../../../Components/Reusables/DropDownField";
import NoCategories from "../../../assets/noCategories.png";
import {
  CiImport,
  CiExport,
  CiTrash,
  CiFilter,
  CiSearch,
} from "react-icons/ci";
import { FaCheck, FaFilter, FaRegEdit } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";

const CategoryList = () => {
  const navigate = useNavigate();
  const {
    getAllOrderedCategories,
    orderedCategories,
    isLoading,
    getCategory,
    category,
  } = useCategory();
  const [open, setOpen] = useState(false);
  const handleEdit = (id) => {
    setOpen(true);
    getCategory(id);
  };
  useEffect(() => {
    getAllOrderedCategories();
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
          <p className=" font-semibold text-2xl">Category</p>
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
                <Tooltip title="Delete Category">
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
                <Tooltip title="Edit Multiple Categories">
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
                <Tooltip title="Add New Category">
                  <div className="flex gap-1 items-center">
                    <PiPlus size={17} />
                    Add Category
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
                  placeholder={"Search Category ..."}
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
              {orderedCategories?.length ? (
                <p>Results : {orderedCategories?.length}</p>
              ) : (
                ""
              )}
            </p>
          </div>

          {/* <Divider className="mb-4!" /> */}
          {isLoading("ordered-categories") ? (
            <div className="flex justify-center items-center p-4">
              <Spinner size={40} />
            </div>
          ) : orderedCategories?.length > 0 ? (
            <Table
              attributes={[
                "Id",
                "Image",
                "Category Name",
                "Sub-Cateogories",
                "Status",
                "Created At",
                "Modified At",
                "Operations",
              ]}
            >
              {orderedCategories.map((cat, i) => (
                <CategoryRow
                  category={cat}
                  handleEdit={handleEdit}
                  index={i}
                  key={`category-${i}`}
                />
              ))}
            </Table>
          ) : (
            <div className="text-center text-gray-500 font-semibold">
              <img
                src={NoCategories}
                alt="No Categories found."
                className="w-100 h-auto mx-auto"
              />
            </div>
          )}
        </Box>
      </div>
      <Modal
        title={"Update Category"}
        open={open}
        setOpen={setOpen}
        fixedFullScreen={false}
      >
        {isLoading("get-category") ? (
          <div className="flex justify-center items-center h-full">
            <p className="font-medium">Loading Category Data...</p>
            <Spinner />
          </div>
        ) : (
          <div className="p-5">
            <CategoryForm
              mode="edit"
              setEditModal={setOpen}
              updationCategory={category}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default CategoryList;
