export const flattenCountries = (countriesByContinent) => {
  let flattenedCountries = [];
  Object.keys(countriesByContinent).forEach((continent) => {
    flattenedCountries.push(
      ...countriesByContinent[continent].map((country) => ({
        ...country,
        checked: false,
        continent,
      }))
    );
  });

  return flattenedCountries;
};
