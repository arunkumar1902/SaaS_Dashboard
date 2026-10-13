import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const defaultData = [
  { month: "Jan", current: 82000, previous: 69000 },
  { month: "Feb", current: 88000, previous: 72000 },
  { month: "Mar", current: 93000, previous: 76000 },
  { month: "Apr", current: 98000, previous: 81000 },
  { month: "May", current: 105000, previous: 86000 },
  { month: "Jun", current: 112000, previous: 91000 },
];

const ComparisonChart = ({
  data = defaultData,
  title = "Period Comparison",
  height = 320,
}) => {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          <p>Compare current and previous periods</p>
        </div>
        <span className="comparison-badge">Current vs Previous</span>
      </div>

      <div className="chart-container" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" name="Current Period" radius={[5, 5, 0, 0]} />
            <Bar dataKey="previous" name="Previous Period" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;