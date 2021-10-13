import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import withScrolling from "react-dnd-scrolling";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// TODO: km - we do still need this?
const ScrollingComponent = withScrolling("div");

import DraggableFlag from "../DraggableFlag";
import DraggableFlagPreview from "../DraggableFlag/DraggableFlagPreview";

interface Props {
  codes?: string[];
  onCheckSubmission?: (submission: string) => void;
}

const responsive = {
  mobile: {
    breakpoint: { max: 1000, min: 0 },
    items: 4,
    slidesToSlide: 2,
  },
};

const GameFlags: FC<Props> = ({
  codes = [],
  onCheckSubmission = (submission: string): void => {},
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      {isMobile ? (
        <>
          <Flex
            width="100%"
            position="relative"
            height="100px"
            marginRight={10}
            alignItems="center"
          >
            <DraggableFlagPreview code={"nz"} />

            <Carousel
              ssr
              responsive={responsive}
              infinite
              deviceType={"mobile"}
              customTransition="transform 150ms ease-in-out"
            >
              {[...Array.from(new Set(codes))]?.map((code) => (
                <Box key={code}>
                  <DraggableFlag
                    code={code}
                    checkSubmission={onCheckSubmission}
                    mx={2}
                  />
                </Box>
              ))}
            </Carousel>
          </Flex>
        </>
      ) : (
        // </Flex>
        // </Box>
        <Flex
          minWidth="300px"
          width="100%"
          minHeight="220px"
          backgroundColor="#236175"
          alignItems="center"
          justifyContent="center"
          paddingLeft="390px"
        >
          <SimpleGrid columns={5} spacingX={6} spacingY={6}>
            {[...Array.from(new Set(codes))]?.map((code) => (
              <DraggableFlag
                key={code}
                code={code}
                checkSubmission={onCheckSubmission}
              />
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </>
  );
};

export default GameFlags;
