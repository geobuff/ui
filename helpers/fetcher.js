import axiosClient from "../axios/axiosClient";

export const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

export const authFetcher = (url, token) => {
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  };

  return fetch(url, options).then((res) => res.json());
};
