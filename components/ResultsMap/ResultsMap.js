import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import { getResults } from "../../helpers/results-list";

import SectionList from "../SectionList";
import ResultsListItem from "../ResultsListItem";

import { AutoSizer, List } from "react-virtualized";

const ResultsMap = ({ quiz, checked, map, hasGameStopped, hasGrouping }) => {
  const sorted = useMemo(
    () =>
      Object.entries(map).map(([key, mapping]) => ({
        title: key,
        data: getResults(mapping, checked, hasGameStopped),
      })),
    [map, checked, hasGameStopped]
  );

  const renderHeader = ({ title, key, style }) => {
    return (
      <Box key={key} style={style}>
        <Text
          marginY={2}
          fontSize="18px"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {title}
        </Text>
      </Box>
    );
  };

  const renderSectionRow = ({ item, key, style }) => {
    return (
      <Box key={key} style={style}>
        <ResultsListItem
          code={item.code}
          svgName={item.svgName}
          isHidden={item.isHidden}
          isMissedResult={item.isMissedResult}
          hasFlag={quiz.hasFlags}
        />
      </Box>
    );
  };

  const renderListRow = ({ key, index, style }) => {
    return (
      <Box key={key} style={style}>
        <ResultsListItem
          code={sorted[0].data[index].code}
          svgName={sorted[0].data[index].svgName}
          isHidden={sorted[0].data[index].isHidden}
          isMissedResult={sorted[0].data[index].isMissedResult}
          hasFlag={quiz.hasFlags}
        />
      </Box>
    );
  };

  const HEADER_HEIGHT = 50;
  const ROW_HEIGHT = 28;

  return (
    <Box textAlign="left" height="100%">
      <Divider my={4} />
      <Text fontSize="xl" mt={2} fontWeight="bold">
        {"Results"}
      </Text>
      <Divider my={3} />
      <Flex
        direction="column"
        height={{ base: "100%", sm: "75%" }}
        minHeight="400px"
      >
        <Box flex="1 1 auto">
          {!!sorted.length && (
            <AutoSizer>
              {({ height, width }) => (
                <>
                  {hasGrouping ? (
                    <SectionList
                      width={width}
                      height={height}
                      sections={sorted}
                      sectionHeaderRenderer={renderHeader}
                      sectionHeaderHeight={HEADER_HEIGHT}
                      rowHeight={ROW_HEIGHT}
                      rowRenderer={renderSectionRow}
                    />
                  ) : (
                    <List
                      width={width}
                      height={height}
                      rowCount={sorted[0].data.length}
                      rowHeight={ROW_HEIGHT}
                      rowRenderer={renderListRow}
                    />
                  )}
                </>
              )}
            </AutoSizer>
          )}
        </Box>
      </Flex>
      <Box height="75px" />
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
  hasGrouping: PropTypes.bool,
};
ResultsMap.defaultProps = {
  quiz: {},
  checked: [],
  map: {},
  hasGameStopped: false,
  hasGrouping: false,
};

export default ResultsMap;
