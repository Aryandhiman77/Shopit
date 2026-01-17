import React from "react";
import DataContext from "./DataContext";

const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={{ name: "aryan" }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
