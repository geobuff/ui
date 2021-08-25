import { useState } from "react";
import jwt_decode from "jwt-decode";
import { User } from "../types/user";
import { DecodedToken } from "../types/decoded-token";

interface Result {
  user: User;
  isLoading: boolean;
  updateUser: (user: User) => void;
  clearUser: () => void;
  tokenExpired: (token: string) => boolean;
}

const useCurrentUser = (): Result => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    if (!window.localStorage.getItem("geobuff.id")) {
      return null;
    }

    return {
      id: parseInt(window.localStorage.getItem("geobuff.id")),
      avatarId: parseInt(window.localStorage.getItem("geobuff.avatarId")),
      avatarName: window.localStorage.getItem("geobuff.avatarName"),
      avatarImageUrl: window.localStorage.getItem("geobuff.avatarImageUrl"),
      avatarBackground: window.localStorage.getItem("geobuff.avatarBackground"),
      avatarBorder: window.localStorage.getItem("geobuff.avatarBorder"),
      username: window.localStorage.getItem("geobuff.username"),
      email: window.localStorage.getItem("geobuff.email"),
      countryCode: window.localStorage.getItem("geobuff.countryCode"),
      xp: parseInt(window.localStorage.getItem("geobuff.xp")),
      isPremium: window.localStorage.getItem("geobuff.isPremium") === "true",
      stripeSessionId: window.localStorage.getItem("geobuff.stripeSessionId"),
      token: window.localStorage.getItem("geobuff.token"),
    };
  });

  const updateUser = (user: User): void => {
    setIsLoading(true);
    setUser(user);
    updateLocalStorage(user);
    setIsLoading(false);
  };

  const clearUser = (): void => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
    setUser(null);
  };

  const updateLocalStorage = (user: User): void => {
    Object.entries(user).forEach(([key, value]) => {
      window.localStorage.setItem(`geobuff.${key}`, value);
    });
  };

  const tokenExpired = (token: string): boolean => {
    const decoded: DecodedToken = jwt_decode(token);
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
