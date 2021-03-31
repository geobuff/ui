export const isBadgeComplete = (badge, user, scores, entriesCount) => {
  switch (badge.id) {
    case 1:
      return user.countryCode !== "";
    case 2:
      return entriesCount > 0;
    default:
      return (
        scores.filter((x) => x.badgeGroup === badge.id).length === badge.total
      );
  }
};

export const getProgress = (badge, user, scores, entriesCount) => {
  switch (badge.id) {
    case 1:
      return user.countryCode !== "" ? 1 : 0;
    case 2:
      return entriesCount > 0 ? 1 : 0;
    default:
      return scores.filter((x) => x.badgeGroup === badge.id).length;
  }
};
