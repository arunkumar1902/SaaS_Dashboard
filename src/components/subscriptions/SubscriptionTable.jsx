import React from "react";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";

const SubscriptionTable = ({
  subscriptions = [],
  onView,
  onEdit,
  onCancel,
}) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Start Date</th>
            <th>Next Billing</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.length === 0 ? (
            <tr>
              <td colSpan="7" className="table-empty">
                No subscriptions found
              </td>
            </tr>
          ) : (
            subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td>
                  <div className="table-user">
                    <div className="table-avatar">
                      {subscription.customerName
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {subscription.customerName}
                      </strong>

                      <span>
                        {subscription.email}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="plan-badge">
                    {subscription.plan}
                  </span>
                </td>

                <td>
                  <strong>
                    $
                    {Number(
                      subscription.amount || 0
                    ).toLocaleString()}
                  </strong>
                  <small className="table-secondary">
                    /{subscription.billingCycle || "month"}
                  </small>
                </td>

                <td>
                  {subscription.startDate || "—"}
                </td>

                <td>
                  {subscription.nextBilling || "—"}
                </td>

                <td>
                  <SubscriptionStatusBadge
                    status={subscription.status}
                  />
                </td>

                <td>
                  <div className="table-actions">
                    <button
                      title="View"
                      onClick={() =>
                        onView?.(subscription)
                      }
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>

                    <button
                      title="Edit"
                      onClick={() =>
                        onEdit?.(subscription)
                      }
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>

                    {subscription.status !==
                      "Cancelled" && (
                      <button
                        className="danger-action"
                        title="Cancel subscription"
                        onClick={() =>
                          onCancel?.(subscription)
                        }
                      >
                        <i className="fa-solid fa-ban"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionTable;