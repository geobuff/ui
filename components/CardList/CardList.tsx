import React, { FC } from "react";
import { Box, Grid, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

type CardListProps = {
  lessItemsThanGrid?: boolean;
};

const CardList: FC<CardListProps> = ({
  lessItemsThanGrid = false,
  children,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Box position="relative">
        <Box
          overflowX="scroll"
          overflowY="auto"
          css={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              width: "0",
              display: "none",
            },
          }}
        >
          <Box>
            <Grid
              templateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr"
              templateRows="1fr"
            >
              {children}
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  }

  if (lessItemsThanGrid) {
    return (
      <SimpleGrid columns={{ sm: 3, lg: 4, xl: 5 }} spacing="24px">
        {children}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid
      column={3}
      justifyContent="center"
      minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
      spacing={{ base: "12px", md: "24px" }}
    >
      {children}
    </SimpleGrid>
  );
};

export default CardList;
