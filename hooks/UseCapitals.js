import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useCapitals = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/capitals`,
    fetcher
  );

  const flattenCapitals = (capitalsByContinent) => {
    let flattenedCapitals = [];
    Object.keys(capitalsByContinent).forEach((continent) => {
      flattenedCapitals.push(
        ...capitalsByContinent[continent].map((capital) => ({
          ...capital,
          checked: false,
          continent,
        }))
      );
    });

    return flattenedCapitals;
  };

  return {
    allCapitals: data ? flattenCapitals(data) : [],
    capitalsByContinent: data || [],
    isPending: !data,
  };
};

export default useCapitals;
