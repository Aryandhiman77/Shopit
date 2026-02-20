import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table";
import CategoryRow from "../../../Components/Table/CategoryRow";
import { Link, useNavigate } from "react-router-dom";
import { PiExport } from "react-icons/pi";
import Search from "../../../Components/Reusables/Search";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import useData from "../../../Components/hooks/useData";
import Box from "../../../Components/Reusables/Elements/Box";
import { Divider } from "@mui/material";
import CustomButton from "../../../Components/Reusables/Elements/CustomBtn";
import Spinner from "../../../Components/Reusables/Elements/Loader/Spinner";
import UpdateCategoryModal from "../../../Components/Reusables/Elements/Modal";
import Modal from "../../../Components/Reusables/Elements/Modal";
import CategoryForm from "../../../Components/CategoryForm/CategoryForm";
import DropDownField from "../../../Components/Reusables/DropDownField";
import { IoFilterCircleOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";

const CategoryList = () => {
  const navigate = useNavigate();
  const {
    getAllOrderedCategories,
    orderedCategories,
    isLoading,
    getCategory,
    category,
  } = useData();
  const [open, setOpen] = useState(false);
  const handleEdit = (id) => {
    if (!id) return;
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

        <Box className="space-y-4 bg-white dark:bg-black rounded-sm!">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-medium text-xl">Categories</p>
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

              <CustomButton
                onClick={() => navigate("/categories/add")}
                type="button"
                className="custom-btn custom-border flex items-center gap-2 !bg-blue-600 !text-white text-sm font-[500]"
                title={"Add Category"}
                fontSize={12}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <Search placeholder={"Search Category ..."} />
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
            <p className="text-gray-500 font-normal text-sm px-2">
              {orderedCategories?.length ? (
                <>Results : {orderedCategories?.length}</>
              ) : (
                ""
              )}
            </p>
          </div>

          <Divider className="mb-4!" />
          {isLoading("ordered-categories") ? (
            <div className="flex justify-center items-center p-4">
              <Spinner size={40} />
            </div>
          ) : orderedCategories?.length > 0 ? (
            <Table
              attributes={[
                "S.no",
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
              No Categories found.
            </div>
          )}
        </Box>
      </div>
      <Modal title={"Update Category"} open={open} setOpen={setOpen}>
        {isLoading("get-category") ? (
          <div className="flex justify-center items-center">
            <p>Loading Category...</p>
            <Spinner />
          </div>
        ) : (
          <div className=" p-5">
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
