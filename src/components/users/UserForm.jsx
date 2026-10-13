import React, { useEffect, useState } from "react";
import Button from "../common/Button";

const initialForm = {
  name: "",
  email: "",
  company: "",
  role: "User",
  plan: "Free",
  status: "Active",
};

const UserForm = ({
  user,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        company: user.company || "",
        role: user.role || "User",
        plan: user.plan || "Free",
        status: user.status || "Active",
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [user]);

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      nextErrors.email = "Enter a valid email";
    }

    if (!form.company.trim()) {
      nextErrors.company = "Company is required";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    onSubmit?.(form);
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>
            Full Name <span>*</span>
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          {errors.name && (
            <small className="form-error">
              {errors.name}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Email <span>*</span>
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="user@example.com"
          />

          {errors.email && (
            <small className="form-error">
              {errors.email}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Company <span>*</span>
          </label>

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company name"
          />

          {errors.company && (
            <small className="form-error">
              {errors.company}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>Role</label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Plan</label>

          <select
            name="plan"
            value={form.plan}
            onChange={handleChange}
          >
            <option value="Free">Free</option>
            <option value="Starter">Starter</option>
            <option value="Professional">
              Professional
            </option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          type="submit"
          loading={loading}
        >
          {user ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;