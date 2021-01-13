import React, { useState, useEffect } from "react";

import CountryResultsList from "../CountryResultsList/CountryResultsList";

const CountryResultsListContainer = () => {
  const [countriesByContinent, setCountriesByContinent] = useState({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountriesByContinent(data);
      });
  }, []);

  return <CountryResultsList countriesByContinent={countriesByContinent} />;
};

export default CountryResultsListContainer;
