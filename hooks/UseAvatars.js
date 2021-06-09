import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useAvatars = () => {
  const { data } = useSWR(`/avatars`, fetcher);

  return {
    avatars: data ?? [],
    isLoading: !data,
  };
};

export default useAvatars;
