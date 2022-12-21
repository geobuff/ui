import React, { FC, useContext } from "react";

import { HomeHeader } from "@geobuff/buff-ui/components";

import { HomeContext } from "../contexts/HomeContext";
import { LanguageContext } from "../contexts/LanguageContext";

import { HeroBannerContainer } from ".";

export const HomeHeaderContainer: FC = () => {
  const { t } = useContext(LanguageContext);
  const { onQuizSearch, searchInputValue, onClearSearchInput } =
    useContext(HomeContext);

  return (
    <HomeHeader
      inputValue={searchInputValue}
      onSearch={onQuizSearch}
      onClear={onClearSearchInput}
      placeholder={t.homeHeader.searchPlaceholder}
    >
      <HeroBannerContainer />
    </HomeHeader>
  );
};
