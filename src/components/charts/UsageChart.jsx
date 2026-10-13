import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const defaultData = [
  { name: "API Calls", usage: 82000 },
  { name: "Storage", usage: 64000 },
  { name: "Projects", usage: 47000 },
  { name: "Users", usage: 38000 },
  { name: "Exports", usage: 27000 },
];

const UsageChart = ({
  data = defaultData,
  title = "Usage Analytics",
  height = 320,
}) => {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          <p>Resource consumption by category</p>
        </div>
      </div>

      <div className="chart-container" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="usage" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;