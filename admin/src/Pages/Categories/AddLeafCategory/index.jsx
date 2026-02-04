import React, { useState } from "react";
import { TextField, Button, FormControlLabel, Switch } from "@mui/material";
import DropDownField from "../../../Components/Reusables/DropDownField";
import ImageDropBox from "../../../Components/Reusables/ImageDropBox";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";

const AddLeafCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      name: categoryName,
      parent: parentCategory,
      description,
      thumbnail,
      status: isActive,
    };
    console.log("Category Data:", categoryData);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-[700] text-black">Add Leaf-Category</h1>
        <BreadCrumb addBreadCrumb="Add Category" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Leaf-Category Name"
          variant="outlined"
          required
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          size="small"
        />
        <DropDownField
          title="Parent Sub-Category"
          items={["Smart Phones", "Television", "Headphones"]}
          setValue={setParentCategory}
        />

        <div className="w-[30%]">
          <ImageDropBox setThumbnail={setThumbnail} />
        </div>

        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              color="primary"
            />
          }
          label={isActive ? "Active" : "Inactive"}
        />

        <Button variant="contained" color="primary" type="submit">
          Add Category
        </Button>
      </form>
    </div>
  );
};

export default AddLeafCategory;
