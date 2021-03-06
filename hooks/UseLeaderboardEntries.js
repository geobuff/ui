import { useEffect, useState } from "react";

const useLeaderboardEntries = (userId) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/countries/leaderboard/${userId}`
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/capitals/leaderboard/${userId}`
      ),
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
