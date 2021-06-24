import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Button,
  Select,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

import ArrowLeft from "../../Icons/ArrowLeft";
import ArrowRight from "../../Icons/ArrowRight";

const LeaderboardPaginationControls = ({
  hasMoreEntries,
  page,
  onChangeLimit,
  onNextPage,
  onPreviousPage,
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  return (
    <Flex marginTop="auto">
      <Select
        backgroundColor="#F3F3F3"
        border="none"
        fontWeight="bold"
        onChange={onChangeLimit}
        width="170px"
        height="48px"
        _hover={{ backgroundColor: "#e6e6e6" }}
      >
        <option value={10}>{"10 Per Page"}</option>
        <option value={20}>{"20 Per Page"}</option>
        <option value={50}>{"50 Per Page"}</option>
      </Select>

      <Box marginLeft="auto">
        <Button
          backgroundColor="#F3F3F3"
          isDisabled={page === 0}
          marginRight={{ base: 2, sm: 3 }}
          onClick={onPreviousPage}
          height="48px"
          width={{ base: "46px", md: "132px" }}
          _hover={{ backgroundColor: "#e6e6e6" }}
        >
          <ArrowLeft
            marginRight={{ base: 0, md: "6px" }}
            height="20px"
            width="20px"
          />
          {shouldRenderOnMobile && "Previous"}
        </Button>

        <Button
          role="group"
          backgroundColor="#F3F3F3"
          onClick={onNextPage}
          isDisabled={!hasMoreEntries}
          height="48px"
          width={{ base: "46px", md: "132px" }}
          _hover={{ backgroundColor: "#e6e6e6" }}
        >
          {shouldRenderOnMobile && "Next"}
          <ArrowRight
            marginLeft={{ base: 0, md: "6px" }}
            height="20px"
            width="20px"
          />
        </Button>
      </Box>
    </Flex>
  );
};

LeaderboardPaginationControls.propTypes = {
  hasMoreEntries: PropTypes.bool,
  page: PropTypes.number,
  onChangeLimit: PropTypes.func,
  onNextPage: PropTypes.func,
  onPreviousPage: PropTypes.func,
};

LeaderboardPaginationControls.defaultProps = {
  hasMoreEntries: false,
  page: 0,
  onChangeLimit: () => {},
  onNextPage: () => {},
  onPreviousPage: () => {},
};

export default LeaderboardPaginationControls;
