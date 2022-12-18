import { SVGBase } from "@geobuff/buff-ui/components";

import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";

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
