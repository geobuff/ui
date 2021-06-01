import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

// import SectionList from "react-virtualized-sectionlist";

import ResultsList from "../ResultsList";
import { getResults } from "../../helpers/results-list";

import SectionList from "../SectionList";
import ResultsListItem from "../ResultsListItem";

import { AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once

const ResultsMap = ({ quiz, checked, map, hasGameStopped }) => {
  const sorted = useMemo(
    () =>
      Object.entries(map).map(([key, mapping]) => ({
        title: key,
        data: getResults(mapping, checked, hasGameStopped),
      })),
    [map, checked, hasGameStopped]
  );

  const renderHeader = ({
    title,
    sectionIndex,
    key,
    style,
    isScrolling,
    isVisible,
    parent,
  }) => {
    return (
      <div key={key} className="list--header" style={style}>
        <Text fontWeight="bold" py={6} textTransform="uppercase">
          {title}
        </Text>
      </div>
    );
  };

  const renderRow = ({
    item,
    sectionIndex,
    rowIndex,
    key,
    style,
    isScrolling,
    isVisible,
    parent,
  }) => {
    item.svgName === "Australia" && console.log(item, "item");
    return (
      <div key={key} className="list--item" style={style}>
        <ResultsListItem
          code={item.code}
          svgName={item.svgName}
          isHidden={item.isHidden}
          isMissedResult={item.isMissedResult}
          hasFlag={quiz.hasFlags}
          my={2}
        />
      </div>
    );
  };

  const ROW_HEIGHT = 30;

  return (
    <Box textAlign="left" height="100%">
      <Divider my={4} />
      <Text fontSize="xl" mt={2} fontWeight="bold">
        {"Results"}
      </Text>
      <Divider my={3} />
      {/* {Object.entries(map).map(([key, mapping], index) => (
          <Box mt={5} key={index}>
            <Text fontWeight="bold" my={3} textTransform="uppercase">
              {key}
            </Text>
            <ResultsList
              quiz={quiz}
              results={getResults(mapping, checked, hasGameStopped)}
            />
          </Box>
        ))} */}
      {/* <Box backgroundColor="red.500" minHeight="200px" height="100%"> */}
      <div style={{ display: "flex", height: "75%", minHeight: "400px" }}>
        <div style={{ flex: "1 1 auto" }}>
          <AutoSizer>
            {({ height, width }) => (
              <SectionList
                width={width}
                height={height}
                sections={sorted}
                sectionHeaderRenderer={renderHeader}
                sectionHeaderHeight={ROW_HEIGHT}
                rowHeight={ROW_HEIGHT}
                rowRenderer={renderRow}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    </Box>
  );
};

ResultsMap.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mapSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    hasFlags: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  checked: PropTypes.array,
  map: PropTypes.object,
  hasGameStopped: PropTypes.bool,
};
ResultsMap.defaultProps = {
  quiz: {},
  checked: [],
  map: {},
  hasGameStopped: false,
};

export default ResultsMap;
