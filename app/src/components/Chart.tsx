import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Data } from "../types";

const renderLineChart = ({ data }: { data: Data[] }): JSX.Element => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="buy" stroke="#FFFF00" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis scale="log" domain={["auto", "auto"]} />
      <Tooltip
        labelStyle={{ color: "black" }}
        itemStyle={{ color: "black" }}
        wrapperStyle={{ backgroundColor: "white" }}
      />
    </LineChart>
  );
};

// rechart bug workaround
// https://github.com/recharts/recharts/issues/3615#issuecomment-1636923358
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default renderLineChart;
