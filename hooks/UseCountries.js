import { useEffect, useState } from "react";

// TODO: use Game Countries?
const useCountries = () => {
  const [isPending, setIsPending] = useState(true);
  const [countriesByContinent, setCountriesByContinent] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const flattenCountries = (countriesByContinent) => {
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "OG:cunts by continent");
        setCountriesByContinent(data);
        setAllCountries(flattenCountries(data));
        setIsPending(false);
      });
  }, []);

  return {
    allCountries,
    countriesByContinent,
    isPending,
    setAllCountries,
    setCountriesByContinent,
  };
};

export default useCountries;
