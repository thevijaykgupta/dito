export function detectCategoryFromTitle(title: string): string | null {
  const value = title.toLowerCase();
  if (value.includes("book") || value.includes("notebook")) return "study-material";
  if (value.includes("cycle") || value.includes("bike")) return "sports-and-fitness";
  if (value.includes("laptop") || value.includes("iphone") || value.includes("android")) return "electronics";
  if (value.includes("table") || value.includes("chair")) return "furniture";
  if (value.includes("chocolate") || value.includes("chips") || value.includes("noodles")) return "snacks";
  return null;
}
