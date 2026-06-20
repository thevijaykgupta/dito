export const featureFlags = {
  showConfessionBanner: false,
  enableFloatingPopups: false,
  enableFeedbackSystem: false,
  enableAchievementSystem: false,
  enableSuggestionsBoard: false,
  enableLiveChat: true,
  enableTeamUp: true,
} as const;

export type FeatureFlagKey = keyof typeof featureFlags;
