export const saveToStorage = (
  key,
  value
) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      "Unable to save data:",
      error
    );
  }
};

export const getFromStorage = (
  key,
  fallback = null
) => {
  try {
    const value = localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : fallback;
  } catch {
    return fallback;
  }
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};