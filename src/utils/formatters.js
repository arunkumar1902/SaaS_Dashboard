export const formatCurrency = (
  value,
  compact = false
) => {
  const number = Number(value || 0);

  if (compact) {
    if (number >= 1000000) {
      return `$${(number / 1000000).toFixed(1)}M`;
    }

    if (number >= 1000) {
      return `$${(number / 1000).toFixed(1)}K`;
    }
  }

  return `$${number.toLocaleString("en-US")}`;
};

export const formatNumber = (value) => {
  return Number(value || 0).toLocaleString("en-US");
};

export const formatPercentage = (value) => {
  return `${Number(value || 0).toFixed(1)}%`;
};

export const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};