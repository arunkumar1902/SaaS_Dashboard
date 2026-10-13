import React from "react";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";

const SubscriptionDetails = ({
  subscription,
}) => {
  if (!subscription) {
    return (
      <div className="details-empty">
        Subscription information is unavailable.
      </div>
    );
  }

  return (
    <div className="subscription-details">
      <div className="subscription-details-header">
        <div className="customer-large-avatar">
          {subscription.customerName
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <h2>{subscription.customerName}</h2>
          <p>{subscription.email}</p>
        </div>

        <SubscriptionStatusBadge
          status={subscription.status}
        />
      </div>

      <div className="subscription-plan-highlight">
        <div>
          <span>Current Plan</span>
          <strong>{subscription.plan}</strong>
        </div>

        <div>
          <span>Billing Amount</span>
          <strong>
            ${Number(
              subscription.amount || 0
            ).toLocaleString()}
            <small>
              /{subscription.billingCycle || "month"}
            </small>
          </strong>
        </div>
      </div>

      <div className="details-section">
        <h3>Subscription Information</h3>

        <div className="details-grid">
          <div className="detail-item">
            <span>Subscription ID</span>
            <strong>{subscription.id}</strong>
          </div>

          <div className="detail-item">
            <span>Start Date</span>
            <strong>
              {subscription.startDate || "—"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Next Billing</span>
            <strong>
              {subscription.nextBilling || "—"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Billing Cycle</span>
            <strong>
              {subscription.billingCycle || "Monthly"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Payment Method</span>
            <strong>
              {subscription.paymentMethod || "—"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Auto Renewal</span>
            <strong>
              {subscription.autoRenew
                ? "Enabled"
                : "Disabled"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;