import React, { useContext } from "react";
import CategoryContext from "../../Context/Category/CategoryContext";
import FilterContext from "../../Context/Filter/FilterContext";

const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters be used inside FilterProvider");
  }
  return context;
};

export default useFilters;
