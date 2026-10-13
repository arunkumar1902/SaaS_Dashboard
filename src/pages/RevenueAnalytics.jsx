import React, { useState } from "react";

import PageHeader from "../components/layout/PageHeader";
import DateRangeFilter from "../components/common/DateRangeFilter";
import StatCard from "../components/common/StatCard";

import RevenueChart from "../components/charts/RevenueChart";
import ComparisonChart from "../components/charts/ComparisonChart";

import {
  revenueData,
  comparisonData,
} from "../data/analytics";

const RevenueAnalytics = () => {
  const [startDate, setStartDate] =
    useState("");
  const [endDate, setEndDate] =
    useState("");

  return (
    <div className="page-container">
      <PageHeader
        title="Revenue Analytics"
        description="Analyze recurring revenue, growth and period-over-period performance."
      />

      <div className="analytics-filter-card">
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          onClear={() => {
            setStartDate("");
            setEndDate("");
          }}
        />
      </div>

      <div className="stats-grid">
        <StatCard
          title="MRR"
          value="$88,450"
          icon="fa-dollar-sign"
          trend={12.8}
          variant="primary"
        />

        <StatCard
          title="ARR"
          value="$1.06M"
          icon="fa-chart-line"
          trend={15.4}
          variant="success"
        />

        <StatCard
          title="Average Revenue / User"
          value="$68.40"
          icon="fa-user-tag"
          trend={7.2}
          variant="purple"
        />

        <StatCard
          title="Revenue Growth"
          value="18.7%"
          icon="fa-arrow-trend-up"
          trend={4.9}
          variant="orange"
        />
      </div>

      <div className="analytics-chart-grid">
        <RevenueChart
          data={revenueData}
          title="Revenue Trend"
          height={400}
        />

        <ComparisonChart
          data={comparisonData}
          title="Revenue Comparison"
          height={400}
        />
      </div>

      <div className="revenue-breakdown">
        <div className="section-title">
          <div>
            <h3>Revenue by Plan</h3>
            <p>
              Monthly contribution by subscription
              plan
            </p>
          </div>
        </div>

        <div className="revenue-plan-list">
          <div className="revenue-plan-row">
            <div className="revenue-plan-info">
              <span className="plan-dot enterprise"></span>
              <div>
                <strong>Enterprise</strong>
                <small>1,476 customers</small>
              </div>
            </div>

            <strong>$293,724</strong>

            <span className="revenue-percentage">
              42.8%
            </span>
          </div>

          <div className="revenue-plan-row">
            <div className="revenue-plan-info">
              <span className="plan-dot professional"></span>
              <div>
                <strong>Professional</strong>
                <small>3,850 customers</small>
              </div>
            </div>

            <strong>$304,150</strong>

            <span className="revenue-percentage">
              44.3%
            </span>
          </div>

          <div className="revenue-plan-row">
            <div className="revenue-plan-info">
              <span className="plan-dot starter"></span>
              <div>
                <strong>Starter</strong>
                <small>4,280 customers</small>
              </div>
            </div>

            <strong>$124,120</strong>

            <span className="revenue-percentage">
              12.9%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;