import React, { FC, createContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import en from "../locales/en";
import es from "../locales/es";
import id from "../locales/id";
import mi from "../locales/mi";

export const LanguageContext = createContext({
  language: "en",
  t: null,
  isLoading: true,
  onChangeLanguage: (e: any) => {},
});

interface Props {
  children: React.ReactNode;
}

export const LanguageContextProvider: FC<Props> = ({ children = null }) => {
  const router = useRouter();
  const { locale } = router;

  const [language, setLanguage] = useState("en");
  const [t, setT] = useState(en);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeLanguage = (e: any): void => {
    const language = e.target.value;
    setLanguage(language);
    setT(getT(language));
    updateLocalStorage(language);
  };

  useEffect(() => {
    const language = window.localStorage.getItem("geobuff.language");

    if (!language) {
      setLanguage(locale);
      setT(getT(locale));
    } else {
      setLanguage(language);
      setT(getT(language));
    }

    setIsLoading(false);
  }, []);

  const getT = (language: string): any => {
    switch (language) {
      case "mi":
        return mi;
      case "es":
        return es;
      case "id":
        return id;
      default:
        return en;
    }
  };

  const updateLocalStorage = (language: string): void => {
    window.localStorage.setItem(`geobuff.language`, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        t,
        isLoading,
        onChangeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};