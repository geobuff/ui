import { useMemo } from "react";

import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useCountries = () => {
  const { data: countries } = useSWR(`/mappings/world-countries`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const sortedCountries = useMemo(
    () =>
      countries
        ?.map((country) => ({
          value: country.code,
          label: country.svgName,
        }))
        ?.sort((a, b) => a.label.localeCompare(b.label)),
    [countries]
  );

  return {
    countries: sortedCountries ?? [],
    isLoading: !countries,
  };
};

export default useCountries;
