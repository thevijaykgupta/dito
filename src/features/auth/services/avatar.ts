export function generateAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name.trim() || "User");
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
}
