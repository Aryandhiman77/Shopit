import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";
const Linechart = ({ data }) => {
  return (
    <>
      <LineChart
        style={{
          width: "600px",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.4,
        }}
        className="p-4"
        responsive
        data={data}
        margin={{
          top: 15,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip contentStyle={{ color: "black" }} />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#f25252"
          isAnimationActive={true}
        />
        {/* <RechartsDevtools /> */}
      </LineChart>
    </>
  );
};

export default Linechart;
