import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { SVGBase } from "../types/svg-base";

interface Result {
  data: SVGBase;
  isLoading: boolean;
}

const useMap = (className: string): Result => {
  const { data } = useSWR(
    () => (className ? `/maps/${className}` : null),
    fetcher
  );

  return {
    data: data,
    isLoading: !data,
  };
};

export default useMap;
