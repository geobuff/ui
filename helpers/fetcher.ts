import axiosClient from "../axios/axiosClient";

export const fetcher = (url: string): Promise<any> =>
  axiosClient.get(url).then((res) => res.data);
