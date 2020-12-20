import countryList from "country-list-js";

export const allCountries = Object.values(countryList.all).map((country) => ({
  code: country.iso2,
  name: country.name,
  continent: country.continent,
}));

export const allCountriesByContinent = Object.values(countryList.all).reduce(
  (continents, country) => ({
    ...continents,
    [country.continent]: [
      ...(continents[country.continent] || []),
      {
        code: country.iso2,
        name: country.name,
      },
    ],
  }),
  {}
);

export const countriesByContinent = (continent) =>
  Object.values(countryList.all).filter(
    (country) => country.continent === continent
  );

export const africa = countriesByContinent("Africa");
export const antarctica = countriesByContinent("Antarctica");
export const asia = countriesByContinent("Asia");
export const europe = countriesByContinent("Europe");
export const northAmerica = countriesByContinent("North America");
export const oceania = countriesByContinent("Oceania");
export const southAmerica = countriesByContinent("South America");
