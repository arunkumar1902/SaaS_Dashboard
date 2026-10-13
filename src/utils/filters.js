export const filterBySearch = (
  items,
  search,
  fields = []
) => {
  if (!search?.trim()) {
    return items;
  }

  const query = search.toLowerCase().trim();

  return items.filter((item) =>
    fields.some((field) =>
      String(item[field] ?? "")
        .toLowerCase()
        .includes(query)
    )
  );
};

export const filterByValue = (
  items,
  field,
  value
) => {
  if (!value) {
    return items;
  }

  return items.filter(
    (item) =>
      String(item[field]).toLowerCase() ===
      String(value).toLowerCase()
  );
};

export const sortItems = (
  items,
  field,
  direction = "asc"
) => {
  return [...items].sort((a, b) => {
    const first = a[field];
    const second = b[field];

    if (
      typeof first === "number" &&
      typeof second === "number"
    ) {
      return direction === "asc"
        ? first - second
        : second - first;
    }

    return direction === "asc"
      ? String(first ?? "").localeCompare(
          String(second ?? "")
        )
      : String(second ?? "").localeCompare(
          String(first ?? "")
        );
  });
};

export const paginateItems = (
  items,
  currentPage,
  itemsPerPage
) => {
  const start =
    (currentPage - 1) * itemsPerPage;

  return items.slice(
    start,
    start + itemsPerPage
  );
};