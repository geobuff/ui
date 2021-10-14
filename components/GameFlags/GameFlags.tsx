import React, { FC, useContext } from "react";
import { Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import DraggableFlag from "../DraggableFlag";
import DraggableFlagPreview from "../DraggableFlag/DraggableFlagPreview";
import CarouselButton from "../Carousel/CarouselButton";
import { FlagGameContext } from "../../context/FlagGameContext";

interface Props {
  codes?: string[];
  onCheckSubmission?: (submission: string) => void;
}

const GameFlags: FC<Props> = ({
  codes = [],
  onCheckSubmission = (submission: string): void => {},
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const { dragItem } = useContext(FlagGameContext);

  const mobileItems = codes.length > 3 ? 3 : codes.length;

  const responsive = {
    tablet: {
      breakpoint: { max: 1000, min: 600 },
      items: 5,
      slidesToSlide: 3,
    },
    largerMobile: {
      breakpoint: { max: 600, min: 500 },
      items: 4,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 370 },
      items: mobileItems,
      slidesToSlide: 2,
    },
    smallMobile: {
      breakpoint: { max: 370, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

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
            <DraggableFlagPreview code={dragItem?.code} />

            <Carousel
              ssr
              infinite
              centerMode={codes.length >= 3}
              responsive={responsive}
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
          </Flex>
        </>
      ) : (
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
