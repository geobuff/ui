import { useState } from "react";
import jwt_decode from "jwt-decode";

const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    if (!window.localStorage.getItem("geobuff.id")) {
      return null;
    }

    return {
      id: parseInt(window.localStorage.getItem("geobuff.id")),
      avatarId: parseInt(window.localStorage.getItem("geobuff.avatarId")),
      username: window.localStorage.getItem("geobuff.username"),
      email: window.localStorage.getItem("geobuff.email"),
      countryCode: window.localStorage.getItem("geobuff.countryCode"),
      xp: parseInt(window.localStorage.getItem("geobuff.xp")),
      isPremium: window.localStorage.getItem("geobuff.isPremium") === "true",
      stripeSessionId: window.localStorage.getItem("geobuff.stripeSessionId"),
      token: window.localStorage.getItem("geobuff.token"),
    };
  });

  const updateUser = (user) => {
    setIsLoading(true);
    setUser(user);
    updateLocalStorage(user);
    setIsLoading(false);
  };

  const clearUser = () => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
    setUser(null);
  };

  const updateLocalStorage = (object) => {
    Object.entries(object).forEach(([key, value]) => {
      window.localStorage.setItem(`geobuff.${key}`, value);
    });
  };

  const tokenExpired = (token) => {
    const decoded = jwt_decode(token);
    const seconds = Math.round(new Date().getTime() / 1000);
    return decoded.exp <= seconds;
  };

  return {
    user,
    isLoading,
    updateUser,
    clearUser,
    tokenExpired,
  };
};

export default useCurrentUser;
