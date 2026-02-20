import React from "react";
import Table from "../../../components/Table";
import CategoryRow from "../../../components/Table/CategoryRow";
import { Link } from "react-router-dom";
import { PiExport } from "react-icons/pi";
import Search from "../../../components/Reusables/Elements/Search";

const CategoryList = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-[700] text-black">Categories</h1>
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
      <Table
        attributes={[
          "Image",
          "Category Name",
          "Slug",
          "Products",
          "Sub-Category",
          "Leaf-Category",
          "Status",
          "Created At",
          "Modified At",
          "Operations",
        ]}
      >
        <CategoryRow
          category={{
            image:
              "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg",
            name: "Electronics",
            slug: "electronics",
            products: 4,
            level2: { name: "Smart Phones" },
            level3: { name: "TouchScreen" },
          }}
        />
      </Table>
    </div>
  );
};

export default CategoryList;
