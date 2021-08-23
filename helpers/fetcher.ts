import axiosClient from "../axios/axiosClient";

export const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

export const authFetcher = (url, token) => {
  const options = {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  };

  return axiosClient.get(url, options).then((res) => res.data);
};
