import React, { FC, useMemo } from "react";
import { QuizSearchResults } from "../../types/quiz-search-results";
import CardListSection from "../CardListSection";
import HomeSearchResultItems from "./HomeSearchResultItems";

export interface Props {
  isSearching?: boolean;
  searchResults?: QuizSearchResults;
  filter?: string;
}

const HomeSearchResults: FC<Props> = ({
  isSearching = true,
  searchResults = null,
  filter = "",
}) => {
  const searchResultItems = useMemo(
    () => <HomeSearchResultItems searchResults={searchResults} />,
    [searchResults]
  );

  return (
    <CardListSection
      title={
        isSearching
          ? `Searching for '${filter}' `
          : `Search results for '${filter}'`
      }
      isLoading={isSearching}
      paddingX={3}
    >
      {searchResultItems}
    </CardListSection>
  );
};
export default HomeSearchResults;
