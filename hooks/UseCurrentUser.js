import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

const useCurrentUser = () => {
  const {
    user: auth0User,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [user, setUser] = useState(null);
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
      const username = decoded[process.env.NEXT_PUBLIC_AUTH0_USERNAME_KEY];

      const updatedUser = {
        ...user,
        username,
        picture: auth0User?.picture,
        email: auth0User?.email,
        updatedAt: auth0User?.updated_at,
      };

      setUser(updatedUser);
      updateLocalStorage(updatedUser);
      setIsLoading(false);
    });
  };

  return {
    isLoading,
    user,
  };
};

export default useCurrentUser;
