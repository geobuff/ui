import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

interface Result {
  data: string;
  isLoading: boolean;
}

const useFlagUrl = (code: string): Result => {
  const { data } = useSWR(() => (code ? `/flags/url/${code}` : null), fetcher);

  return {
    data: data,
    isLoading: !data,
  };
};

export default useFlagUrl;
