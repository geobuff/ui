import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

const useCurrentUser = () => {
  const {
    user: auth0User,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      return {
        id: window.localStorage.getItem("geobuff.id"),
        username: window.localStorage.getItem("geobuff.username"),
        countryCode: window.localStorage.getItem("geobuff.countryCode"),
        xp: window.localStorage.getItem("geobuff.xp"),
        email: window.localStorage.getItem("geobuff.email"),
        picture: window.localStorage.getItem("geobuff.picture"),
        updatedAt: window.localStorage.getItem("geobuff.updatedAt"),
      };
    } else {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      !user && setIsLoading(true);
      refreshToken();
    }
  }, [isAuthenticated]);

  const updateLocalStorage = (object) => {
    Object.entries(object).forEach(([key, value]) => {
      window.localStorage.setItem(`geobuff.${key}`, value);
    });
  };

  const refreshToken = () => {
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      const decoded = jwt_decode(token);
      const id = decoded[process.env.NEXT_PUBLIC_AUTH0_USERID_KEY];

      const params = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, params)
        .then((response) => response.json())
        .then((data) => {
          const updatedUser = {
            id: id,
            username: data.username,
            countryCode: data.countryCode,
            xp: data.xp,
            picture: auth0User?.picture,
            email: auth0User?.email,
            updatedAt: auth0User?.updated_at,
          };

          setUser(updatedUser);
          updateLocalStorage(updatedUser);
          setIsLoading(false);
        });
    });
  };

  return {
    isLoading,
    user,
  };
};

export default useCurrentUser;
