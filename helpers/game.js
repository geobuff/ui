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

export const findSubmissionByNames = (collection, submissionName) =>
  collection?.find(
    ({ name, alternativeNames }) =>
      name.toLowerCase() === submissionName.toLowerCase() ||
      alternativeNames.includes(submissionName.toLowerCase())
  );

export const findSubmissionsByPrefixes = (collection, submissionName) =>
  collection.filter((submission) =>
    submission.prefixes.includes(submissionName.toLowerCase())
  );
