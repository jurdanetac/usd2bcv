import React from "react";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import api from "./services/api";

// rechart bug
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

type Data = {
  date: string;
  source: string;
  bolivar: string;
  buy: number;
  sell: number;
};

const renderLineChart = ({ data }: { data: Data[] }): JSX.Element => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="buy" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState([]);

  const roundUpto = (number: number, upto: number) => {
    return Number(number.toFixed(upto));
  };

  useEffect(() => {
    api.getAll().then((response) => {
      // only show current currency
      const bsdOnly = response.data.filter(
        (item: Data) => item.bolivar === "Bs. D",
      );
      // mid-market rate
      setData(
        bsdOnly.map((item: Data) => {
          const midMarketRate = (item.buy + item.sell) / 2;
          return { ...item, buy: roundUpto(midMarketRate, 2) };
        }),
      );
    });
  }, []);

  return (
    <div>
      <h1>Bs. D vs USD</h1>
      {renderLineChart({ data })}
    </div>
  );
};

export default App;
