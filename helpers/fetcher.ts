import axiosClient from "../axios/axiosClient";

export const fetcher = (url: string): Promise<any> =>
  axiosClient.get(url).then((res) => res.data);

export const authFetcher = (url: string, token: string): Promise<any> => {
  const options = {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  };

  return axiosClient.get(url, options).then((res) => res.data);
};
