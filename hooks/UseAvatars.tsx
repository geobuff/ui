import useSWR from "swr";

import { fetcher } from "../helpers/fetcher";
import { Avatar } from "../types/avatar";

interface Result {
  avatars: Avatar[];
  isLoading: boolean;
}

const useAvatars = (): Result => {
  const { data } = useSWR(`/avatars`, fetcher);

  return {
    avatars: data ?? [],
    isLoading: !data,
  };
};

export default useAvatars;
