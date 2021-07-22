import React from "react";
import PropTypes from "prop-types";

import { Box, SimpleGrid, Skeleton, Flex } from "@chakra-ui/react";

const MerchListPlaceholder = ({ noOfTiles }) => (
  <Box
    width={{ base: "95%", sm: "80%", md: "65%" }}
    maxWidth="1200px"
    marginTop="32px"
    marginLeft="auto"
    marginRight="auto"
  >
    <SimpleGrid
      justifyContent="center"
      marginBottom="72px"
      minChildWidth={{ base: "140px", sm: "185px", md: "200px" }}
      spacing={{ base: "16px", md: "24px" }}
    >
      <Flex justifyContent="center">
        {[...Array(noOfTiles)].map((_, i) => (
          <Skeleton
            key={i}
            width="300px"
            minHeight={{ base: "220px", md: "260px" }}
            maxHeight="260px"
            marginX={{ base: 1, md: 5 }}
            borderRadius={12}
          />
        ))}
      </Flex>
    </SimpleGrid>
  </Box>
);

MerchListPlaceholder.propTypes = {
  noOfTiles: PropTypes.number,
};

export default MerchListPlaceholder;
