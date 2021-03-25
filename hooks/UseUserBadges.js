import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axiosClient from "../axios/axiosClient";

const useUserBadges = (userId) => {
  const { getAccessTokenSilently } = useAuth0();

  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axiosClient.get(`/users/badges/${userId}`, config).then((response) => {
        setUserBadges(response.data);
        setLoading(false);
      });
    });
  }, []);

  return {
    userBadges: userBadges,
    loading: loading,
  };
};

export default useUserBadges;
