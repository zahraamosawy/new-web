export const normalizeItemType = (itemType = "") => {
  const t = itemType.toLowerCase();

  if (t.includes("news")) return "news";
  if (t.includes("project")) return "project";
  if (t.includes("product")) return "product";

  return "unknown";
};
