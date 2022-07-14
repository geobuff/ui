import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";
import { FlagGroup } from "../types/flag-group";

interface Result {
  data: FlagGroup;
  isLoading: boolean;
  getFlagUrl: (countryCode: string) => string;
}

const UseWorldFlagGroup = (): Result => {
  const { data } = useSWR(`/flags/world`, fetcher);

  const getFlagUrl = (countryCode: string): string => {
    if (!data) return "";
    return data.entries.find((x) => x.code === countryCode)?.url ?? "";
  };

  return {
    data: data,
    isLoading: !data,
    getFlagUrl: getFlagUrl,
  };
};

export default UseWorldFlagGroup;
