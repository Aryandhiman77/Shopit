import React, { useState } from "react";
import ChartDataContext from "./ChartDataContext";
const ChartDataProvider = ({ children }) => {
  const [lineChartData, setLineChartData] = useState([
    { name: "JAN", Total_Users: 4000, Total_Sales: 2400, amt: 2400 },
    { name: "FEB", Total_Users: 3000, Total_Sales: 1398, amt: 2210 },
    { name: "MARCH", Total_Users: 2000, Total_Sales: 9800, amt: 2290 },
    { name: "APRIL", Total_Users: 2780, Total_Sales: 3908, amt: 2000 },
    { name: "MAY", Total_Users: 1890, Total_Sales: 4800, amt: 2181 },
    { name: "JUNE", Total_Users: 2390, Total_Sales: 3800, amt: 2500 },
    { name: "JULY", Total_Users: 3490, Total_Sales: 4300, amt: 2100 },
    { name: "AUGUST", Total_Users: 3490, Total_Sales: 4300, amt: 2100 },
  ]);
  return (
    <ChartDataContext.Provider value={{ lineChartData }}>
      {children}
    </ChartDataContext.Provider>
  );
};

export default ChartDataProvider;
