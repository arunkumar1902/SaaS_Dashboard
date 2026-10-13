import React from "react";

const UserTable = ({
  users = [],
  onView,
  onEdit,
  onDelete,
}) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "status-success";

      case "inactive":
        return "status-neutral";

      case "suspended":
        return "status-danger";

      case "pending":
        return "status-warning";

      default:
        return "status-neutral";
    }
  };

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Company</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Joined</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="table-empty">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="table-user">
                    <div className="table-avatar">
                      {user.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.role || "User"}</span>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>{user.company || "—"}</td>

                <td>
                  <span className="plan-badge">
                    {user.plan || "Free"}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${getStatusClass(
                      user.status
                    )}`}
                  >
                    {user.status || "Active"}
                  </span>
                </td>

                <td>{user.joinedAt || "—"}</td>

                <td>
                  <div className="table-actions">
                    <button
                      title="View"
                      onClick={() => onView?.(user)}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>

                    <button
                      title="Edit"
                      onClick={() => onEdit?.(user)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>

                    <button
                      className="danger-action"
                      title="Delete"
                      onClick={() => onDelete?.(user)}
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

export default UserTable;