import React, { createContext, useState, FC, useEffect } from "react";
import { UserDto } from "../../types/user-dto";

export const CurrentUserContext = createContext({
  user: null,
  isLoading: false,
  updateUser: (user: UserDto): void => {},
  clearUser: (): void => {},
});

interface Props {
  children: React.ReactNode;
}

export const CurrentUserContextProvider: FC<Props> = ({ children = null }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserDto>();

  useEffect(() => {
    setUser({
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
      flagUrl: window.localStorage.getItem("geobuff.flagUrl"),
      isAdmin: window.localStorage.getItem("geobuff.isAdmin") === "true",
      xp: parseInt(window.localStorage.getItem("geobuff.xp")),
      joined: window.localStorage.getItem("geobuff.joined"),
    });
    setIsLoading(false);
  }, []);

  const updateUser = (user: UserDto): void => {
    setIsLoading(true);
    setUser(user);
    updateLocalStorage(user);
    setIsLoading(false);
  };

  const clearUser = (): void => {
    window.localStorage.clear();
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
