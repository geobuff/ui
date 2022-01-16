import React, { FC } from "react";
import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";

interface Props {
  noOfTiles: number;
}

const MerchListPlaceholder: FC<Props> = ({ noOfTiles }) => (
  <Box
    width="100%"
    maxWidth={1300}
    marginTop="32px"
    marginLeft="auto"
    marginRight="auto"
    paddingX={{ base: 3, md: 10 }}
  >
    <SimpleGrid
      justifyContent="center"
      marginBottom="72px"
      minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
      spacing={{ base: "16px", md: "24px" }}
    >
      {[...Array(noOfTiles)].map((_, i) => (
        <Skeleton
          key={i}
          width={{ base: "225px", md: "250px" }}
          height={{ base: "225px", md: "250px" }}
          borderRadius={12}
        ></Skeleton>
      ))}
    </SimpleGrid>
  </Box>
);

export default MerchListPlaceholder;
