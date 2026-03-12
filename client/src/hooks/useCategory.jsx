import React, { useContext } from "react";
import CategoryContext from "../context/category/CategoryContext";

const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used inside CategoryProvider");
  }
  return context;
};

export default useCategory;
