import React, { useContext } from "react";
import CategoryContext from "../../Context/Category/CategoryContext";

const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useData be used inside AuthProvider");
  }
  return context;
};

export default useCategory;
