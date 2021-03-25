import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axiosClient from "../axios/axiosClient";

const useScores = (userId) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [scores, setScores] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      }).then((token) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axiosClient.get(`/scores/${userId}`, config).then((response) => {
          setScores(response.data);
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
