import React, { FC } from "react";
import CardListSection from "../CardListSection";

export interface Props {
  isSearching?: boolean;
  searchResultItems?: JSX.Element;
  filter?: string;
}

const HomeSearchResults: FC<Props> = ({
  isSearching = true,
  searchResultItems = null,
  filter = "",
}) => (
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

export default HomeSearchResults;
