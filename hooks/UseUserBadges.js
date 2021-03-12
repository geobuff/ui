import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useUserBadges = (userId) => {
  const { getAccessTokenSilently } = useAuth0();

  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/badges/${userId}`, params)
        .then((response) => response.json())
        .then((data) => {
          setUserBadges(data);
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
