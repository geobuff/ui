import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const useLeaderboardEntries = (id) => {
  const { data: countriesEntry } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/leaderboard/${id}`,
    fetcher
  );

  const { data: capitalsEntry } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/capitals/leaderboard/${id}`,
    fetcher
  );

  return {
    entries:
      countriesEntry && capitalsEntry ? [countriesEntry, capitalsEntry] : [],
    isPending: !countriesEntry || !capitalsEntry,
  };
};

export default useLeaderboardEntries;
