import { useEffect, useState } from "react";

import axiosClient from "../axios";
import { MappingEntry } from "../types/mapping-entry";

interface Result {
  data: MappingEntry[];
  isLoading: boolean;
}

export const useMappingEntries = (key: string): Result => {
  const [data, setData] = useState<MappingEntry[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`${process.env.NEXT_PUBLIC_API_URL}/mappings/${key}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
  }, [key]);

  return {
    data: data,
    isLoading: isLoading,
  };
};
