import React, { createContext, useState, FC, useEffect } from "react";
import { useRouter } from "next/router";

import en from "../../locales/en";
import es from "../../locales/es";

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
    router.push(router.asPath, undefined, { locale: language });
  };

  useEffect(() => {
    const language = window.localStorage.getItem("geobuff.language");

    if (!language) {
      setLanguage(locale);
      setT(getT(locale));
    } else {
      setLanguage(language);
      setT(getT(language));
      router.push(router.asPath, undefined, { locale: language });
    }

    setIsLoading(false);
  }, []);

  const getT = (language: string): any => {
    return language === "es" ? es : en;
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
