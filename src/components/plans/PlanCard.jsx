import React from "react";

const PlanCard = ({
  plan,
  onView,
  onEdit,
  onDelete,
  featured = false,
}) => {
  if (!plan) return null;

  return (
    <div
      className={`plan-card ${
        featured || plan.featured ? "plan-featured" : ""
      }`}
    >
      {(featured || plan.featured) && (
        <div className="featured-label">
          Most Popular
        </div>
      )}

      <div className="plan-card-header">
        <div className="plan-icon">
          <i className="fa-solid fa-layer-group"></i>
        </div>

        <div className="plan-actions">
          <button onClick={() => onEdit?.(plan)}>
            <i className="fa-solid fa-pen"></i>
          </button>

          <button onClick={() => onDelete?.(plan)}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>

      <div className="plan-card-content">
        <h3>{plan.name}</h3>

        <p>{plan.description}</p>

        <div className="plan-price">
          <strong>
            ${Number(plan.price || 0).toLocaleString()}
          </strong>

          <span>
            /{plan.billingCycle || "month"}
          </span>
        </div>

        <div className="plan-subscribers">
          <i className="fa-solid fa-users"></i>
          {plan.subscribers || 0} subscribers
        </div>

        <div className="plan-divider"></div>

        <ul className="plan-features">
          {(plan.features || []).map(
            (feature, index) => (
              <li key={index}>
                <i className="fa-solid fa-check"></i>
                <span>{feature}</span>
              </li>
            )
          )}
        </ul>
      </div>

      <button
        className="plan-view-button"
        onClick={() => onView?.(plan)}
      >
        View Plan Details
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default PlanCard;