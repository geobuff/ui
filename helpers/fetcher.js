export const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

export const authFetcher = (url, token) => {
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  };

  return fetch(url, options).then((res) => res.json());
};
