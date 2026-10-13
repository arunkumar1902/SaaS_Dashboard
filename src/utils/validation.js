export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

export const validateRequired = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
  );
};

export const validateUser = (user) => {
  const errors = {};

  if (!validateRequired(user.name)) {
    errors.name = "Name is required";
  }

  if (!validateRequired(user.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(user.email)) {
    errors.email = "Invalid email address";
  }

  if (!validateRequired(user.company)) {
    errors.company =
      "Company name is required";
  }

  return errors;
};

export const validatePlan = (plan) => {
  const errors = {};

  if (!validateRequired(plan.name)) {
    errors.name = "Plan name is required";
  }

  if (
    plan.price === "" ||
    plan.price === undefined ||
    Number(plan.price) < 0
  ) {
    errors.price = "Invalid price";
  }

  if (!validateRequired(plan.description)) {
    errors.description =
      "Description is required";
  }

  return errors;
};