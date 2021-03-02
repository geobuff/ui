import { useEffect, useState } from "react";

const useLeaderboardEntries = (id) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries/leaderboard/${id}`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/capitals/leaderboard/${id}`),
    ])
      .then((response) =>
        Promise.all(
          response.filter((x) => x.status === 200).map((x) => x.json())
        )
      )
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  return {
    entries: entries,
    isPending: loading,
  };
};

export default useLeaderboardEntries;
