import React, { useContext } from "react";
import DataContext from "../context/data/DataContext";

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }
  return context;
};

export default useData;
