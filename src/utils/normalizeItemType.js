export const normalizeItemType = (itemType = "") => {
  const t = itemType.toLowerCase();
  
  console.log("Normalizing itemType:", itemType, "->", t);

  if (t.includes("news")) {
    console.log("Identified as news");
    return "news";
  }
  if (t.includes("project")) {
    console.log("Identified as project");
    return "project";
  }
  if (t.includes("product") || t.includes("prodect")) {
    console.log("Identified as product");
    return "product";
  }

  console.log("Identified as unknown");
  return "unknown";
};
