import React, { useContext } from "react";
import DataContext from "../Context/Data/DataContext";

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }
  return context;
};

export default useData;
