import React, { useState } from "react";
import FilterContext from "./FilterContext";
import { Outlet } from "react-router-dom";

const FilterProvider = () => {
  const [filters, setFilters] = useState({});
  const handleOnChange = (value) => {
    setFilters((prev) => ({ ...prev, ...value }));
  };
  const resetFilters = () => {
    setFilters({});
  };
  return (
    <FilterContext.Provider
      value={{ filters, setFilters, handleOnChange, resetFilters }}
    >
      <Outlet />
    </FilterContext.Provider>
  );
};

export default FilterProvider;
