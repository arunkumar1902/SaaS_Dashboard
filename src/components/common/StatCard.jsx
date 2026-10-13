import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendLabel = "vs last month",
  variant = "primary",
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="stat-card stat-card-loading">
        <div className="skeleton skeleton-icon"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-value"></div>
      </div>
    );
  }

  const isPositive = Number(trend) >= 0;

  return (
    <div className={`stat-card stat-${variant}`}>
      <div className="stat-card-top">
        <div className="stat-card-icon">
          <i className={`fa-solid ${icon}`}></i>
        </div>

        {trend !== undefined && trend !== null && (
          <div
            className={`stat-trend ${
              isPositive ? "trend-positive" : "trend-negative"
            }`}
          >
            <i
              className={`fa-solid ${
                isPositive ? "fa-arrow-up" : "fa-arrow-down"
              }`}
            ></i>

            {Math.abs(Number(trend))}%
          </div>
        )}
      </div>

      <div className="stat-card-content">
        <p>{title}</p>
        <h2>{value}</h2>

        {trend !== undefined && trend !== null && (
          <span className="stat-trend-label">{trendLabel}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;