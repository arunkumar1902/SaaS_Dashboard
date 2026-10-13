import React, { useEffect, useState } from "react";
import Button from "../common/Button";

const defaultForm = {
  name: "",
  description: "",
  price: "",
  billingCycle: "Monthly",
  subscribers: 0,
  status: "Active",
  features: [""],
  featured: false,
};

const PlanForm = ({
  plan,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plan) {
      setForm({
        name: plan.name || "",
        description: plan.description || "",
        price: plan.price ?? "",
        billingCycle: plan.billingCycle || "Monthly",
        subscribers: plan.subscribers || 0,
        status: plan.status || "Active",
        features:
          plan.features?.length > 0
            ? plan.features
            : [""],
        featured: Boolean(plan.featured),
      });
    } else {
      setForm(defaultForm);
    }

    setErrors({});
  }, [plan]);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    setForm((previous) => {
      const features = [...previous.features];
      features[index] = value;

      return {
        ...previous,
        features,
      };
    });
  };

  const addFeature = () => {
    setForm((previous) => ({
      ...previous,
      features: [...previous.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setForm((previous) => ({
      ...previous,
      features: previous.features.filter(
        (_, featureIndex) => featureIndex !== index
      ),
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Plan name is required";
    }

    if (!form.description.trim()) {
      nextErrors.description =
        "Description is required";
    }

    if (
      form.price === "" ||
      Number(form.price) < 0
    ) {
      nextErrors.price =
        "Enter a valid plan price";
    }

    const validFeatures = form.features.filter(
      (feature) => feature.trim()
    );

    if (validFeatures.length === 0) {
      nextErrors.features =
        "Add at least one feature";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    onSubmit?.({
      ...form,
      price: Number(form.price),
      features: form.features.filter((feature) =>
        feature.trim()
      ),
    });
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Plan Name <span>*</span>
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Professional"
        />

        {errors.name && (
          <small className="form-error">
            {errors.name}
          </small>
        )}
      </div>

      <div className="form-group">
        <label>
          Description <span>*</span>
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the plan..."
          rows="3"
        />

        {errors.description && (
          <small className="form-error">
            {errors.description}
          </small>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Price <span>*</span>
          </label>

          <div className="input-with-prefix">
            <span>$</span>

            <input
              type="number"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          {errors.price && (
            <small className="form-error">
              {errors.price}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>Billing Cycle</label>

          <select
            name="billingCycle"
            value={form.billingCycle}
            onChange={handleChange}
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Plan Status</label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="form-group">
        <div className="form-label-row">
          <label>
            Features <span>*</span>
          </label>

          <button
            type="button"
            className="add-feature-button"
            onClick={addFeature}
          >
            <i className="fa-solid fa-plus"></i>
            Add Feature
          </button>
        </div>

        <div className="features-input-list">
          {form.features.map((feature, index) => (
            <div
              className="feature-input-row"
              key={index}
            >
              <div className="feature-input">
                <i className="fa-solid fa-check"></i>

                <input
                  value={feature}
                  onChange={(event) =>
                    handleFeatureChange(
                      index,
                      event.target.value
                    )
                  }
                  placeholder="Enter plan feature"
                />
              </div>

              {form.features.length > 1 && (
                <button
                  type="button"
                  className="remove-feature"
                  onClick={() =>
                    removeFeature(index)
                  }
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          ))}
        </div>

        {errors.features && (
          <small className="form-error">
            {errors.features}
          </small>
        )}
      </div>

      <label className="checkbox-label">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />

        <span>
          Mark as featured / most popular plan
        </span>
      </label>

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
          {plan ? "Update Plan" : "Create Plan"}
        </Button>
      </div>
    </form>
  );
};

export default PlanForm;