import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { ShippingOption } from "../types/shipping-option";

interface Result {
  data: ShippingOption[];
  isLoading: boolean;
}

const useShippingOptions = (): Result => {
  const { data } = useSWR(`/shipping-options`, fetcher);

  return {
    data: data,
    isLoading: !data,
  };
};

export default useShippingOptions;
