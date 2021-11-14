import React, { createContext, useState, FC } from "react";

export const AppContext = createContext({
  isNavSidebarOpen: false,
  setIsNavSidebarOpen: (isOpen: boolean) => {},
});

export const AppContextProvider: FC = ({ children }) => {
  const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false);

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
