import React, { useContext } from "react";
import CategoryContext from "../../Context/Category/CategoryContext";

const useFilters = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useFilters be used inside FilterProvider");
  }
  return context;
};

export default useFilters;
