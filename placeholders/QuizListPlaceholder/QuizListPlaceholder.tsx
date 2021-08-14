import React from "react";
import PropTypes from "prop-types";
import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";

const QuizListPlaceholder = ({ noOfTiles }) => (
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
      {[...Array(noOfTiles)].map((_, i) => (
        <Skeleton
          key={i}
          width="100%"
          height="200px"
          borderRadius={12}
        ></Skeleton>
      ))}
    </SimpleGrid>
  </Box>
);

QuizListPlaceholder.propTypes = {
  noOfTiles: PropTypes.number,
};

export default QuizListPlaceholder;
