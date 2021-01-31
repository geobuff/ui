import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useStates = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/us`, fetcher);

  return {
    allStates: data,
    isPending: !data,
  };
};

export default useStates;
