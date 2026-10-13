import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const defaultData = [
  { month: "Jan", active: 7200, cancelled: 320 },
  { month: "Feb", active: 7800, cancelled: 350 },
  { month: "Mar", active: 8300, cancelled: 390 },
  { month: "Apr", active: 8900, cancelled: 410 },
  { month: "May", active: 9500, cancelled: 430 },
  { month: "Jun", active: 10100, cancelled: 470 },
  { month: "Jul", active: 10900, cancelled: 460 },
  { month: "Aug", active: 11400, cancelled: 490 },
  { month: "Sep", active: 12100, cancelled: 510 },
  { month: "Oct", active: 12800, cancelled: 530 },
];

const SubscriptionChart = ({
  data = defaultData,
  title = "Subscription Growth",
  height = 320,
}) => {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          <p>Active vs cancelled subscriptions</p>
        </div>
      </div>

      <div className="chart-container" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="active" name="Active" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="cancelled" name="Cancelled" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscriptionChart;