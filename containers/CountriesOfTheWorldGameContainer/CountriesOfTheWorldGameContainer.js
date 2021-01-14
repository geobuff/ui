import React from "react";
import CountriesOfTheWorldGame from "../../games/CountriesOfTheWorldGame";
import useCountries from "../../hooks/UseCountries";

const CountriesOfTheWorldGameContainer = () => {
  const {
    allCountries,
    countriesByContinent,
    isPending,
    setAllCountries,
    setCountriesByContinent,
  } = useCountries();

  //   const [score, setScore] = useState(0);

  const updateCountriesByContinentBySearch = (searchTerm) => {
    let updatedCountries = {};

    Object.entries(countriesByContinent).forEach(([key, value]) => {
      updatedCountries = {
        ...updatedCountries,
        [key]: value.map((country) => {
          if (country.name.toLowerCase() === searchTerm.toLowerCase()) {
            return {
              ...country,
              checked: true,
            };
          } else {
            return country;
          }
        }),
      };
    });
    return updatedCountries;
  };

  const handleChange = (event) => {
    const { value } = event.currentTarget;

    const updatedCountries = allCountries.map((country) => {
      if (country.name.toLowerCase() === value.toLowerCase()) {
        return {
          ...country,
          checked: true,
        };
      } else {
        return country;
      }
    });

    const updatedCountriesByContinent = updateCountriesByContinentBySearch(
      value
    );

    setAllCountries(updatedCountries);
    setCountriesByContinent(updatedCountriesByContinent);
  };

  return (
    <CountriesOfTheWorldGame
      countries={allCountries}
      countriesByContinent={countriesByContinent}
      isLoading={isPending}
      onChange={handleChange}
    />
  );
};

export default CountriesOfTheWorldGameContainer;
