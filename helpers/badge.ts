export const isBadgeComplete = (badge, entries) => {
  switch (badge.id) {
    case 1:
      return entries.length > 0;
    default:
      return (
        entries.filter((x) => x.badgeGroup === badge.id).length === badge.total
      );
  }
};

export const getProgress = (badge, entries) => {
  switch (badge.id) {
    case 1:
      return entries.length > 0 ? 1 : 0;
    default:
      return entries.filter((x) => x.badgeGroup === badge.id).length;
  }
};
