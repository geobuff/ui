export const mergeArrayByName = (a, b) =>
  a.map((itm) => ({
    ...b.find((item) => item.name === itm.name && item),
    ...itm,
  }));
