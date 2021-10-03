import { Badge } from "../types/badge";
import { UserLeaderboardEntry } from "../types/user-leaderboard-entry";

export const isBadgeComplete = (
  badge: Badge,
  entries: UserLeaderboardEntry[]
): boolean => {
  switch (badge.id) {
    case 1:
      return entries.length > 0;
    default:
      return (
        entries.filter((x) => x.badgeGroup === badge.id).length === badge.total
      );
  }
};

export const getProgress = (
  badge: Badge,
  entries: UserLeaderboardEntry[]
): number => {
  switch (badge.id) {
    case 1:
      return entries.length > 0 ? 1 : 0;
    default:
      return entries.filter((x) => x.badgeGroup === badge.id).length;
  }
};
