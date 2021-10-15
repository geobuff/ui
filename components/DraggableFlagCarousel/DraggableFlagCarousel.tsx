import { Flex, useMediaQuery } from "@chakra-ui/react";
import React, { FC } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import CarouselButton from "../Carousel/CarouselButton";
import DraggableFlag from "../DraggableFlag";

const responsiveConfig = {
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
  resConfig: any,
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
  codes?: string[];
  onCheckSubmission?: (submission: string) => void;
}

const DraggableFlagCarousel: FC<Props> = ({
  codes = [],
  onCheckSubmission,
}) => {
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

  if (codes.length <= carouselThreshold) {
    return (
      <Flex
        width="100%"
        position="relative"
        height="100px"
        alignItems="center"
        justifyContent="center"
      >
        {[...Array.from(new Set(codes))]?.map((code) => (
          <DraggableFlag
            key={code}
            code={code}
            checkSubmission={onCheckSubmission}
            mx={3}
          />
        ))}
      </Flex>
    );
  }

  return (
    <Carousel
      ssr
      infinite
      centerMode={codes.length >= 3}
      responsive={responsiveConfig}
      deviceType={"mobile"}
      customTransition="transform 150ms ease-in-out"
      customLeftArrow={<CarouselButton position="left" />}
      customRightArrow={<CarouselButton position="right" />}
      itemClass="flex center"
    >
      {[...Array.from(new Set(codes))]?.map((code) => (
        <DraggableFlag
          key={code}
          code={code}
          checkSubmission={onCheckSubmission}
          mx={2}
        />
      ))}
    </Carousel>
  );
};

export default DraggableFlagCarousel;
