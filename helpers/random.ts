export const getRandomCollectionItem = (collection: any[]): any =>
  collection[Math.floor(Math.random() * collection.length)];

export const getRandomCollectionItems = (
  collection: any[],
  length: number
): any => collection.sort(() => 0.5 - Math.random()).slice(0, length);
