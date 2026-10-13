import React from "react";

const PlanTable = ({
  plans = [],
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Billing</th>
            <th>Subscribers</th>
            <th>Revenue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.length === 0 ? (
            <tr>
              <td colSpan="7" className="table-empty">
                No plans found
              </td>
            </tr>
          ) : (
            plans.map((plan) => (
              <tr key={plan.id}>
                <td>
                  <div className="plan-table-name">
                    <div className="plan-table-icon">
                      <i className="fa-solid fa-layer-group"></i>
                    </div>

                    <div>
                      <strong>{plan.name}</strong>
                      <span>
                        {plan.description || "—"}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <strong>
                    ${Number(plan.price || 0).toLocaleString()}
                  </strong>
                </td>

                <td>
                  {plan.billingCycle || "Monthly"}
                </td>

                <td>
                  {Number(
                    plan.subscribers || 0
                  ).toLocaleString()}
                </td>

                <td>
                  $
                  {Number(
                    plan.revenue || 0
                  ).toLocaleString()}
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      plan.status === "Active"
                        ? "status-success"
                        : "status-neutral"
                    }`}
                  >
                    {plan.status || "Active"}
                  </span>
                </td>

                <td>
                  <div className="table-actions">
                    <button onClick={() => onView?.(plan)}>
                      <i className="fa-regular fa-eye"></i>
                    </button>

                    <button onClick={() => onEdit?.(plan)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>

                    <button
                      className="danger-action"
                      onClick={() => onDelete?.(plan)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
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

export default PlanTable;