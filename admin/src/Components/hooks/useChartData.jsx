import { useContext } from "react";
import ChartDataContext from "../../Context/Charts/ChartDataContext";

const useChartData = () => {
  const context = useContext(ChartDataContext);
  if (!context) {
    throw new Error("useChartData be used inside ChartDataProvider");
  }
  return context;
};

export default useChartData;
