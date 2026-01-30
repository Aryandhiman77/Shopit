import React from "react";
import ChartContext from "./ChartContext";

const ChartDataProvider = ({ children }) => {
  const lineChartData = [
    {
      name: "Day 1",
      sales: 2333,
      pv: 3300,
    },
    {
      name: "Day 2",
      sales: 664,
      pv: 3300,
    },
    {
      name: "Day 3",
      sales: 545,
      pv: 3300,
    },
    {
      name: "Day 4",
      sales: 122,
      pv: 3300,
    },
    {
      name: "Day 5",
      sales: 2335,
      pv: 3300,
    },
    {
      name: "Day 6",
      sales: 333,
      pv: 3300,
    },
  ];
  return (
    <ChartContext.Provider value={{ lineChartData }}>
      {children}
    </ChartContext.Provider>
  );
};

export default ChartDataProvider;
