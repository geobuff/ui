import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useCountries = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/mappings/countries`,
    fetcher
  );

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

  return {
    allCountries: data ? flattenCountries(data) : [],
    countriesByContinent: data || [],
    isPending: !data,
  };
};

export default useCountries;
