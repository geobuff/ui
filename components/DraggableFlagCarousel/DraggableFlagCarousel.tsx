import React, { FC, useContext, useEffect } from "react";

import { DelayedRender } from "@geobuff/buff-ui/components";

import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { FlagGameContext } from "../../contexts/FlagGameContext";

import { FlagDetails } from "../../types/flag-details";
import DraggableFlag from "../DraggableFlag";
import CarouselButton from "./CarouselButton";

const responsiveConfig: ResponsiveType = {
  tablet: {
    breakpoint: { max: 1000, min: 600 },
    items: 5,
    slidesToSlide: 3,
  },
  largeMobile: {
    breakpoint: { max: 600, min: 500 },
    items: 4,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 370 },
    items: 3,
    slidesToSlide: 2,
  },
  smallMobile: {
    breakpoint: { max: 370, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const getCarouselThreshold = (
  resConfig: ResponsiveType,
  resBreakpoints: boolean[]
): number => {
  const currentBreakpointIndex = resBreakpoints.findIndex(
    (breakpoint) => String(breakpoint) === "true"
  );
  const currentConfig =
    resConfig[Object.keys(resConfig)[currentBreakpointIndex]];

  return currentConfig?.items || 0;
};

export interface Props {
  flags?: FlagDetails[];
  onCheckSubmission?: (submission: string) => void;
}

const DraggableFlagCarousel: FC<Props> = ({
  flags = [],
  onCheckSubmission,
}) => {
  const { handleDragging } = useContext(FlagGameContext);

  const responsiveBreakpoints = useMediaQuery([
    "(max-width: 1000px) and (min-width: 600px)",
    "(max-width: 600px) and (min-width: 500px)",
    "(max-width: 500px) and (min-width: 375px)",
    "(max-width: 375px) and (min-width: 0px)",
  ]);

  const carouselThreshold = getCarouselThreshold(
    responsiveConfig,
    responsiveBreakpoints
  );

  useEffect(() => {
    if (flags.length <= carouselThreshold) {
      handleDragging({ code: "", isDragging: false, url: "" });
    }
    // including handleDragging here will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags, carouselThreshold]);

  /**
   *  The carousel bugs out if you have less flags than the breakpoint config,
   *  i.e. 2 flags left where the responsiveConfig specifies 3 flags to display.
   *
   *  To fix this we render the flags without the carousel if they can fit on the
   *  given breakpoint.
   *  */
  if (flags.length <= carouselThreshold) {
    return (
      <Flex
        width="100%"
        position="relative"
        height="100px"
        alignItems="center"
        justifyContent="center"
      >
        {flags.length ? (
          [...Array.from(new Set(flags))]?.map((flag) => (
            <DraggableFlag
              key={flag.code}
              code={flag.code}
              url={flag.url}
              checkSubmission={onCheckSubmission}
              mx={3}
            />
          ))
        ) : (
          <DelayedRender shouldFadeIn>
            <Box paddingY={4} width="100%" textAlign="center">
              <Text fontSize="20px" color="gray.500" fontWeight={700} mr={1}>
                {`Perfect score, well done! 🥳`}
              </Text>
            </Box>
          </DelayedRender>
        )}
      </Flex>
    );
  }

  return (
    <Carousel
      ssr
      infinite
      centerMode
      responsive={responsiveConfig}
      deviceType={"mobile"}
      customTransition="transform 150ms ease-in-out"
      customLeftArrow={<CarouselButton position="left" />}
      customRightArrow={<CarouselButton position="right" />}
      itemClass="flex center"
      containerClass="fade-in"
    >
      {[...Array.from(new Set(flags))]?.map((flag) => (
        <DraggableFlag
          key={flag.code}
          code={flag.code}
          url={flag.url}
          checkSubmission={onCheckSubmission}
          mx={2}
        />
      ))}
    </Carousel>
  );
};

export default DraggableFlagCarousel;
