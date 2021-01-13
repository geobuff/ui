import React from "react";
import useSWR from "swr";

import { fetcher } from "../../helpers/fetcher";
import CountryResultsList from "../CountryResultsList/CountryResultsList";
import CountryResultsListPlaceholder from "../CountryResultsListPlaceholder/CountryResultsListPlaceholder";

const CountryResultsListContainer = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/countries`,
    fetcher
  );

  if (!data) {
    return <CountryResultsListPlaceholder />;
  }

  return <CountryResultsList countriesByContinent={data} />;
};

export default CountryResultsListContainer;
