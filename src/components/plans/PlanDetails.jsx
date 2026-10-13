import React from "react";

const PlanDetails = ({ plan }) => {
  if (!plan) {
    return (
      <div className="details-empty">
        Plan information is unavailable.
      </div>
    );
  }

  return (
    <div className="plan-details">
      <div className="plan-details-hero">
        <div className="plan-details-icon">
          <i className="fa-solid fa-layer-group"></i>
        </div>

        <div>
          <h2>{plan.name}</h2>
          <p>{plan.description}</p>
        </div>
      </div>

      <div className="plan-details-price">
        <span>Plan Price</span>

        <div>
          <strong>
            ${Number(plan.price || 0).toLocaleString()}
          </strong>

          <small>
            /{plan.billingCycle || "month"}
          </small>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <span>Subscribers</span>
          <strong>
            {Number(
              plan.subscribers || 0
            ).toLocaleString()}
          </strong>
        </div>

        <div className="detail-item">
          <span>Revenue</span>
          <strong>
            ${Number(
              plan.revenue || 0
            ).toLocaleString()}
          </strong>
        </div>

        <div className="detail-item">
          <span>Status</span>
          <strong>{plan.status || "Active"}</strong>
        </div>

        <div className="detail-item">
          <span>Billing Cycle</span>
          <strong>
            {plan.billingCycle || "Monthly"}
          </strong>
        </div>
      </div>

      <div className="details-section">
        <h3>Plan Features</h3>

        <ul className="details-feature-list">
          {(plan.features || []).map(
            (feature, index) => (
              <li key={index}>
                <span className="feature-check">
                  <i className="fa-solid fa-check"></i>
                </span>

                {feature}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default PlanDetails;