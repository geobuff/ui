import React, { createContext, useState, FC } from "react";
import { UserDto } from "../../types/user-dto";

export const CurrentUserContext = createContext({
  user: null,
  isLoading: false,
  updateUser: (user: UserDto): void => {},
  clearUser: (): void => {},
});

export const CurrentUserContextProvider: FC = ({ children = null }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<UserDto>(() => {
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
      joined: window.localStorage.getItem("geobuff.joined"),
    };
  });

  const updateUser = (user: UserDto): void => {
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

  const updateLocalStorage = (user: UserDto): void => {
    Object.entries(user).forEach(([key, value]) => {
      window.localStorage.setItem(`geobuff.${key}`, value);
    });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        isLoading,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
