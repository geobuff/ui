import React, { FC, createContext, useEffect, useState } from "react";

import { useLocalStorage } from "@rehooks/local-storage";
import { Router } from "next/router";

import { OperatingSystem } from "../../types/operating-system";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

export const AppContext = createContext({
  isNavSidebarOpen: false,
  setIsNavSidebarOpen: (isOpen: boolean) => {},
  hasNotch: false,
  operatingSystem: null as OperatingSystem,
  isNotchedIphone: false,
});

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider: FC<Props> = ({ children }) => {
  const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false);
  const [hasNotch, setHasNotch] = useState(false);
  const [operatingSystem, setOperatingSystem] = useState(null);

  const [localHasNotch] = useLocalStorage("geobuff.device.hasNotch");
  const [localOS] = useLocalStorage("geobuff.device.os");

  Router.events.on("routeChangeStart", () => {
    setIsNavSidebarOpen(false);
  });

  useEffect(() => {
    setHasNotch(Boolean(localHasNotch));
  }, [localHasNotch]);

  useEffect(() => {
    setOperatingSystem((localOS?.toLowerCase() as OperatingSystem) || null);
  }, [localOS]);

  const isNotchedIphone =
    isAppMobile && hasNotch && operatingSystem === OperatingSystem.iOS;

  return (
    <AppContext.Provider
      value={{
        isNavSidebarOpen,
        setIsNavSidebarOpen,
        hasNotch,
        operatingSystem,
        isNotchedIphone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
