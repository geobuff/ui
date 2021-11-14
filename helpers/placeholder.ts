export const getNumberOfQuizTilesByHeight = (height: number): number => {
  // Ensure we always have something rendering immediately
  if (height === null) {
    return 20;
  }

  switch (true) {
    case height >= 1300:
      return 20;
    case height < 1300 && height >= 1000:
      return 15;
    default:
      return 10;
  }
};
