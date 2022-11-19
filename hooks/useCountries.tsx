import { useMemo } from "react";

import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { SortedCountry } from "../types/sorted-country";

interface Result {
  countries: SortedCountry[];
  isLoading: boolean;
}

const useCountries = (): Result => {
  const { data } = useSWR(`/mappings/world-countries`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const sortedCountries = useMemo(
    () =>
      data
        ?.map((country) => ({
          value: country.code,
          label: country.svgName,
        }))
        ?.sort((a, b) => a.label.localeCompare(b.label)),
    [data]
  );

  return {
    countries: sortedCountries ?? [],
    isLoading: !data,
  };
};

export default useCountries;
