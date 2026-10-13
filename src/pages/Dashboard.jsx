import React from "react";

import StatCard from "../components/common/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import SubscriptionChart from "../components/charts/SubscriptionChart";
import UsageChart from "../components/charts/UsageChart";
import ComparisonChart from "../components/charts/ComparisonChart";

import { useSaaS } from "../context/SaaSContext";

import {
  revenueData,
  subscriptionData,
  usageData,
  comparisonData,
} from "../data/analytics";

const Dashboard = () => {
  const {
    users,
    subscriptions,
    plans,
    totalRevenue,
  } = useSaaS();

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const activeSubscriptions =
    subscriptions.filter(
      (subscription) =>
        subscription.status === "Active"
    ).length;

  const churnedSubscriptions =
    subscriptions.filter(
      (subscription) =>
        subscription.status === "Cancelled"
    ).length;

  const churnRate =
    subscriptions.length > 0
      ? (
          (churnedSubscriptions /
            subscriptions.length) *
          100
        ).toFixed(1)
      : 0;

  const arr = totalRevenue * 12;

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <h1>Dashboard Overview</h1>
          <p>
            Monitor your SaaS business performance,
            customers and revenue.
          </p>
        </div>

        <div className="dashboard-date">
          <i className="fa-regular fa-calendar"></i>
          October 2026
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Monthly Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon="fa-dollar-sign"
          trend={12.8}
          variant="primary"
        />

        <StatCard
          title="Active Users"
          value={activeUsers.toLocaleString()}
          icon="fa-users"
          trend={8.4}
          variant="success"
        />

        <StatCard
          title="Active Subscriptions"
          value={activeSubscriptions.toLocaleString()}
          icon="fa-repeat"
          trend={6.7}
          variant="purple"
        />

        <StatCard
          title="Annual Recurring Revenue"
          value={`$${arr.toLocaleString()}`}
          icon="fa-chart-line"
          trend={15.2}
          variant="orange"
        />

        <StatCard
          title="Churn Rate"
          value={`${churnRate}%`}
          icon="fa-arrow-trend-down"
          trend={-2.1}
          variant="danger"
        />

        <StatCard
          title="Total Plans"
          value={plans.length}
          icon="fa-layer-group"
          trend={4.5}
          variant="info"
        />
      </div>

      <div className="dashboard-chart-grid dashboard-chart-main">
        <RevenueChart data={revenueData} />
        <SubscriptionChart data={subscriptionData} />
      </div>

      <div className="dashboard-chart-grid">
        <UsageChart data={usageData} />
        <ComparisonChart data={comparisonData} />
      </div>

      <div className="dashboard-summary-grid">
        <div className="dashboard-summary-card">
          <div className="summary-icon">
            <i className="fa-solid fa-users"></i>
          </div>

          <div>
            <span>Customer Base</span>
            <strong>
              {users.length.toLocaleString()}
            </strong>
            <small>
              Registered customers
            </small>
          </div>
        </div>

        <div className="dashboard-summary-card">
          <div className="summary-icon">
            <i className="fa-solid fa-credit-card"></i>
          </div>

          <div>
            <span>Paid Customers</span>
            <strong>
              {
                users.filter(
                  (user) =>
                    user.plan !== "Free"
                ).length
              }
            </strong>
            <small>
              Customers on paid plans
            </small>
          </div>
        </div>

        <div className="dashboard-summary-card">
          <div className="summary-icon">
            <i className="fa-solid fa-chart-simple"></i>
          </div>

          <div>
            <span>Average Revenue</span>
            <strong>
              $
              {activeSubscriptions
                ? Math.round(
                    totalRevenue /
                      activeSubscriptions
                  ).toLocaleString()
                : 0}
            </strong>
            <small>
              Revenue per subscription
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;