import { useEffect, useState } from "react";

import axiosClient from "../axios/axiosClient";
import useCurrentUser from "./UseCurrentUser";

const useScores = (userId) => {
  const { user } = useCurrentUser();

  const [scores, setScores] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axiosClient.get(`/scores/${userId}`, config).then((response) => {
        setScores(response.data);
        setLoading(false);
      });
    }
  }, [user]);

  return {
    scores: scores,
    isLoading: loading,
  };
};

export default useScores;
