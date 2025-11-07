import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineGraph = ({ data }) => {
const maxValue = Math.max(...data.map(d => d.value), 0);
const yMax = Math.ceil((maxValue + 1) / 100) * 100;

  return (
    <ResponsiveContainer width="100%" height={663}>
    <AreaChart data={data} margin={{ left:0, bottom: 54 }}>
      <defs>
        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2EB865" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#2EB865" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <YAxis domain={[0, yMax]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip formatter={(value) => [`${value}점이에요 😌`, "점수"]} />
      <Area type="monotone" dataKey="value" stroke="#2EB865" fill="url(#colorScore)" />
    </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
