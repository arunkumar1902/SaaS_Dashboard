import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const defaultData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 48000 },
  { month: "Mar", revenue: 53000 },
  { month: "Apr", revenue: 51000 },
  { month: "May", revenue: 62000 },
  { month: "Jun", revenue: 69000 },
  { month: "Jul", revenue: 74000 },
  { month: "Aug", revenue: 81000 },
  { month: "Sep", revenue: 79000 },
  { month: "Oct", revenue: 88000 },
  { month: "Nov", revenue: 94000 },
  { month: "Dec", revenue: 102000 },
];

const RevenueChart = ({
  data = defaultData,
  title = "Revenue Overview",
  height = 320,
}) => {
  return (
    <div className="chart-card">
      
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          <p>Monthly recurring revenue performance</p>
        </div>

        <button className="chart-menu">
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      <div className="chart-container" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopOpacity={0.35} />
                <stop offset="100%" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
            <Area type="monotone" dataKey="revenue" strokeWidth={3} fill="url(#revenueGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;