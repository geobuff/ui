import React, { FC, createContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import ar from "../locales/ar";
import de from "../locales/de";
import en from "../locales/en";
import es from "../locales/es";
import fr from "../locales/fr";
import hi from "../locales/hi";
import id from "../locales/id";
import mi from "../locales/mi";
import ru from "../locales/ru";
import zh from "../locales/zh";
import { ALLOWED_LANGUAGES } from "../types/languages";

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
  const { locale } = useRouter();

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
    if (
      typeof window !== "undefined" &&
      window.location.hostname &&
      window.location.hostname.includes(".")
    ) {
      const locale = window.location.hostname.substring(
        0,
        window.location.hostname.indexOf(".")
      );

      if (ALLOWED_LANGUAGES.includes(locale)) {
        setLanguage(locale);
        setT(getT(locale));
        return;
      }
    }

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
      case "zh":
        return zh;
      case "hi":
        return hi;
      case "ar":
        return ar;
      case "id":
        return id;
      case "de":
        return de;
      case "fr":
        return fr;
      case "ru":
        return ru;
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
