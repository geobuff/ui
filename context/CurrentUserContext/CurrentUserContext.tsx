import React, { createContext, useState, FC } from "react";
import { AxiosRequestConfig } from "axios";
import { DecodedToken } from "../../types/decoded-token";
import { AuthUser } from "../../types/auth-user";
import jwt_decode from "jwt-decode";

export const CurrentUserContext = createContext({
  user: null,
  isLoading: false,
  updateUser: (user: AuthUser): void => {},
  clearUser: (): void => {},
  tokenExpired: (token: string): boolean => {
    return false;
  },
  getAuthConfig: (): AxiosRequestConfig => {
    return null;
  },
});

export const CurrentUserContextProvider: FC = ({ children = null }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<AuthUser>(() => {
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
      avatarDescription: window.localStorage.getItem(
        "geobuff.avatarDescription"
      ),
      avatarPrimaryImageUrl: window.localStorage.getItem(
        "geobuff.avatarPrimaryImageUrl"
      ),
      avatarSecondaryImageUrl: window.localStorage.getItem(
        "geobuff.avatarSecondaryImageUrl"
      ),
      username: window.localStorage.getItem("geobuff.username"),
      email: window.localStorage.getItem("geobuff.email"),
      countryCode: window.localStorage.getItem("geobuff.countryCode"),
      xp: parseInt(window.localStorage.getItem("geobuff.xp")),
      isAdmin: window.localStorage.getItem("geobuff.isAdmin") === "true",
      isPremium: window.localStorage.getItem("geobuff.isPremium") === "true",
      token: window.localStorage.getItem("geobuff.token"),
      joined: window.localStorage.getItem("geobuff.joined"),
    };
  });

  const updateUser = (user: AuthUser): void => {
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

  const updateLocalStorage = (user: AuthUser): void => {
    Object.entries(user).forEach(([key, value]) => {
      window.localStorage.setItem(`geobuff.${key}`, value);
    });
  };

  const tokenExpired = (token: string): boolean => {
    const decoded: DecodedToken = jwt_decode(token);
    const seconds = Math.round(new Date().getTime() / 1000);
    return decoded.exp <= seconds;
  };

  const getAuthConfig = (): AxiosRequestConfig => {
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  };

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        isLoading,
        updateUser,
        clearUser,
        tokenExpired,
        getAuthConfig,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
