import React, { createContext, useState, FC } from "react";
import { Router } from "next/router";

export const AppContext = createContext({
  isNavSidebarOpen: false,
  setIsNavSidebarOpen: (isOpen: boolean) => {},
});

export const AppContextProvider: FC = ({ children }) => {
  const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setIsNavSidebarOpen(false);
  });

  return (
    <AppContext.Provider
      value={{
        isNavSidebarOpen,
        setIsNavSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
