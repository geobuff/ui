import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { Order } from "../types/order";

interface Result {
  orders: Order[];
  isLoading: boolean;
}

const useOrders = (email: string): Result => {
  const { data } = useSWR(`/orders/${email}`, fetcher);

  return {
    orders: data ?? [],
    isLoading: !data,
  };
};

export default useOrders;
