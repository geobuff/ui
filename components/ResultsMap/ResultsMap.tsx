import React, { useMemo, FC } from "react";

import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { AutoSizer, List as VirtualizedList } from "react-virtualized";

import { getResults } from "../../helpers/results-list";

import VirtualizedSectionList from "../SectionList";
import ResultsListItem from "../ResultsListItem";
import { Mapping } from "../../types/mapping";
import { ResultMap } from "../../types/result-map";

const HEADER_HEIGHT = 50;
const ROW_HEIGHT = 28;

export interface Props {
  map?: ResultMap;
  checked?: Mapping[];
  hasHeader?: boolean;
  hasGameStopped?: boolean;
  hasGroupings?: boolean;
  hasFlags?: boolean;
}

const ResultsMap: FC<Props> = ({
  map = {},
  checked = [],
  hasHeader = true,
  hasGameStopped = false,
  hasGroupings = false,
  hasFlags = false,
}) => {
  const results = useMemo(
    () =>
      Object.entries(map).map(([key, mapping]) => ({
        title: key,
        data: getResults(mapping, checked, hasGameStopped),
      })),
    [map, checked, hasGameStopped]
  );

  const resultRows = results[0]?.data;

  const renderHeader = ({ title, key, style }): React.ReactNode => (
    <Box key={key} style={style}>
      <Box height="100%" marginTop={4}>
        <Text fontSize="18px" fontWeight="bold" textTransform="uppercase">
          {title}
        </Text>
      </Box>
    </Box>
  );

  const renderSectionRow = ({ item, key, style }): React.ReactNode => (
    <Box key={key} style={style}>
      <ResultsListItem
        code={item.code}
        svgName={item.svgName}
        isHidden={item.isHidden}
        isMissedResult={item.isMissedResult}
        hasFlag={hasFlags}
      />
    </Box>
  );

  const renderListRow = ({ key, index, style }): React.ReactNode => (
    <Box key={key} style={style}>
      <ResultsListItem
        code={resultRows[index].code}
        svgName={resultRows[index].svgName}
        isHidden={resultRows[index].isHidden}
        isMissedResult={resultRows[index].isMissedResult}
        hasFlag={hasFlags}
      />
    </Box>
  );

  return (
    <Box textAlign="left" height="100%">
      {hasHeader && (
        <>
          <Divider my={3} />
          <Text fontSize="xl" fontWeight="bold">
            {"Results"}
          </Text>
          <Divider my={3} />
        </>
      )}

      <Flex
        direction="column"
        height={{ base: "100%", sm: "75%" }}
        minHeight="400px"
      >
        <Box flex="1 1 auto">
          {!!results.length && (
            <AutoSizer>
              {({ height, width }): React.ReactNode => (
                <>
                  {hasGroupings ? (
                    <VirtualizedSectionList
                      width={width}
                      height={height}
                      sections={results}
                      sectionHeaderRenderer={renderHeader}
                      sectionHeaderHeight={HEADER_HEIGHT}
                      rowHeight={ROW_HEIGHT}
                      rowRenderer={renderSectionRow}
                    />
                  ) : (
                    <VirtualizedList
                      width={width}
                      height={height}
                      rowCount={resultRows.length}
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
      <Box height={{ base: "35px", md: "20px", lg: "35px" }} />
    </Box>
  );
};

export default ResultsMap;
