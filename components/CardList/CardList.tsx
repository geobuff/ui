import React, { FC, useRef, useState } from "react";
import { Box, Grid, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

// TODO: fix layout when less items than grid
const CardList: FC = ({ children }) => {
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const listInnerRef = useRef<null | HTMLDivElement>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const onScroll = () => {
    if (listInnerRef.current && listInnerRef.current?.scrollLeft) {
      const { scrollLeft, scrollWidth, clientWidth } = listInnerRef.current;
      setShowLeftShadow(scrollLeft > 40);
      setShowRightShadow(scrollLeft + clientWidth !== scrollWidth);
    }
  };

  if (isMobile) {
    return (
      <Box position="relative">
        <Box
          ref={listInnerRef}
          onScroll={onScroll}
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
          <Box
            position="absolute"
            left="-10px"
            top={0}
            bottom={0}
            width="20px"
            transition="all 200ms ease-in"
            opacity={showLeftShadow ? 1 : 0}
            backgroundImage="-webkit-linear-gradient(90deg, rgba(240,240,240,1) 60%, rgba(255,255,255,0) 100%)"
            css={{
              backgroundImage:
                "linear-gradient(90deg, rgba(240,240,240,1) 60%, rgba(255,255,255,0) 100%)",
            }}
          />
          <Box
            position="absolute"
            right="-10px"
            top={0}
            bottom={0}
            width="20px"
            transition="all 200 ease-in"
            opacity={showRightShadow ? 1 : 0}
            backgroundImage="-webkit-linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(240,240,240,1) 60%)"
            css={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(240,240,240,1) 60%)",
            }}
          />
        </Box>
      </Box>
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
