import React, { useContext } from "react";
import AuthContext from "../Context/Auth/AuthContext";
import ChartContext from "../Context/Charts/ChartContext";

const useChartData = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChartData must be used inside AuthProvider");
  }
  return context;
};

export default useChartData;
