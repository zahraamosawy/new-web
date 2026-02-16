const normalizeItemType = (type = "") => {
  const t = type.toLowerCase();

  if (t.includes("news")) return "news";
  if (t.includes("product")) return "product";
  if (t.includes("project")) return "project";

  return "unknown";
};
