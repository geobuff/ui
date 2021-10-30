import React, { createContext, useState, FC } from "react";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

export const AppContext = createContext({
  isNavSidebarOpen: false,
  setIsNavSidebarOpen: (isOpen: boolean) => {},
  isAppMobile: false,
});

export const AppContextProvider: FC = ({ children }) => {
  const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isNavSidebarOpen,
        setIsNavSidebarOpen,
        isAppMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
