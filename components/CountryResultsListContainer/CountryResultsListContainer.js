import React from "react";
import useSWR from "swr";

import { fetcher } from "../../helpers/fetcher";
import CountryResultsList from "../CountryResultsList/CountryResultsList";

const CountryResultsListContainer = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/countries`,
    fetcher
  );

  return <CountryResultsList countriesByContinent={data} />;
};

export default CountryResultsListContainer;
