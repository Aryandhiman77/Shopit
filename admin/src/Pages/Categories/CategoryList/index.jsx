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
    console.log(category)
  }, [category]);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-[700] text-black">Categories</h1>
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
          <Search placeholder={"Search Category ..."} />
        </div>
        <Box className="space-y-4 bg-white dark:bg-black">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-semibold text-xl">
              Categories List
            </p>
            <CustomButton
              onClick={() => navigate("/categories/add")}
              type="button"
              bg={"#9ca1dc"}
              title={"+ Add Top-level-Category"}
              fontSize={12}
            />
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
          <div className="p-4 overflow-y-scroll!">
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
