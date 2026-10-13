import React, { useState } from "react";

import PageHeader from "../components/layout/PageHeader";
import DateRangeFilter from "../components/common/DateRangeFilter";
import StatCard from "../components/common/StatCard";

import UsageChart from "../components/charts/UsageChart";
import ComparisonChart from "../components/charts/ComparisonChart";

import {
  usageData,
  comparisonData,
} from "../data/analytics";

const UsageAnalytics = () => {
  const [startDate, setStartDate] =
    useState("");
  const [endDate, setEndDate] =
    useState("");

  return (
    <div className="page-container">
      <PageHeader
        title="Usage Analytics"
        description="Track product usage, resource consumption and customer activity."
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
          title="Total API Calls"
          value="82,450"
          icon="fa-code"
          trend={18.4}
          variant="primary"
        />

        <StatCard
          title="Storage Used"
          value="64.2 GB"
          icon="fa-database"
          trend={9.7}
          variant="purple"
        />

        <StatCard
          title="Active Projects"
          value="4,782"
          icon="fa-folder"
          trend={14.2}
          variant="success"
        />

        <StatCard
          title="Avg. Usage / User"
          value="72%"
          icon="fa-chart-column"
          trend={5.8}
          variant="orange"
        />
      </div>

      <div className="analytics-chart-grid">
        <UsageChart
          data={usageData}
          title="Resource Usage"
          height={380}
        />

        <ComparisonChart
          data={comparisonData}
          title="Usage Comparison"
          height={380}
        />
      </div>

      <div className="analytics-breakdown-card">
        <div className="section-title">
          <div>
            <h3>Usage Breakdown</h3>
            <p>
              Current resource utilization
            </p>
          </div>
        </div>

        <div className="usage-progress-list">
          <div className="usage-progress-item">
            <div className="usage-progress-header">
              <span>API Usage</span>
              <strong>82%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: "82%" }}
              ></div>
            </div>
          </div>

          <div className="usage-progress-item">
            <div className="usage-progress-header">
              <span>Storage</span>
              <strong>64%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: "64%" }}
              ></div>
            </div>
          </div>

          <div className="usage-progress-item">
            <div className="usage-progress-header">
              <span>Projects</span>
              <strong>47%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: "47%" }}
              ></div>
            </div>
          </div>

          <div className="usage-progress-item">
            <div className="usage-progress-header">
              <span>User Seats</span>
              <strong>76%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: "76%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;