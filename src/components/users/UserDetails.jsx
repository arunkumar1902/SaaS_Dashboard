import React from "react";

const UserDetails = ({ user }) => {
  if (!user) {
    return (
      <div className="details-empty">
        User information is unavailable.
      </div>
    );
  }

  return (
    <div className="user-details">
      <div className="user-details-header">
        <div className="user-details-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <span>Company</span>
          <strong>{user.company || "—"}</strong>
        </div>

        <div className="detail-item">
          <span>Role</span>
          <strong>{user.role || "—"}</strong>
        </div>

        <div className="detail-item">
          <span>Plan</span>
          <strong>{user.plan || "Free"}</strong>
        </div>

        <div className="detail-item">
          <span>Status</span>
          <strong>{user.status || "Active"}</strong>
        </div>

        <div className="detail-item">
          <span>Joined Date</span>
          <strong>{user.joinedAt || "—"}</strong>
        </div>

        <div className="detail-item">
          <span>Last Login</span>
          <strong>{user.lastLogin || "—"}</strong>
        </div>
      </div>

      <div className="details-section">
        <h3>Account Information</h3>

        <div className="details-info-row">
          <span>User ID</span>
          <strong>{user.id}</strong>
        </div>

        <div className="details-info-row">
          <span>Usage</span>
          <strong>
            {user.usage ? `${user.usage}%` : "—"}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;