import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useCounties = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/uk`, fetcher);

  return {
    allCounties: data,
    isPending: !data,
  };
};

export default useCounties;
