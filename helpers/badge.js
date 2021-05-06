export const isBadgeComplete = (badge, scores, entriesCount) => {
  switch (badge.id) {
    case 1:
      return entriesCount > 0;
    default:
      return (
        scores.filter((x) => x.badgeGroup === badge.id).length === badge.total
      );
  }
};

export const getProgress = (badge, scores, entriesCount) => {
  switch (badge.id) {
    case 1:
      return entriesCount > 0 ? 1 : 0;
    default:
      return scores.filter((x) => x.badgeGroup === badge.id).length;
  }
};
