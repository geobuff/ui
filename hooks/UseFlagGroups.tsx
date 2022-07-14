import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { FlagEntry, FlagGroup } from "../types/flag-group";

interface Result {
  data: FlagGroup[];
  isLoading: boolean;
  getFlagUrl: (key: string, code: string) => string;
  getFlagEntriesByKey: (key: string) => FlagEntry[];
  getFlagUrlByCode: (code: string) => string;
}

const useFlagGroups = (): Result => {
  const { data } = useSWR("/flags", fetcher);

  const getFlagUrl = (key: string, code: string): string => {
    if (!data) return "";
    const group = data.find((x) => x.key === key);
    if (group === undefined) return "";
    return group.entries.find((x) => x.code === code)?.url ?? "";
  };

  const getFlagEntriesByKey = (key: string): FlagEntry[] => {
    if (!data) return [];
    const group = data.find((x) => x.key === key);
    return group === undefined ? [] : group.entries;
  };

  const getFlagUrlByCode = (code: string): string => {
    if (!data) return "";
    const entries = data.reduce((a, b) => a.concat(b.entries), []);
    return entries.find((x) => x.code === code)?.url ?? "";
  };

  return {
    data: data ?? [],
    isLoading: !data,
    getFlagUrl: getFlagUrl,
    getFlagEntriesByKey: getFlagEntriesByKey,
    getFlagUrlByCode: getFlagUrlByCode,
  };
};

export default useFlagGroups;
