import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useScores = (userId) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [scores, setScores] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      }).then((token) => {
        const params = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/scores/${userId}`, params)
          .then((response) => response.json())
          .then((data) => {
            setScores(data);
            setLoading(false);
          });
      });
    }
  }, [isAuthenticated]);

  return {
    scores: scores,
    isLoading: loading,
  };
};

export default useScores;
