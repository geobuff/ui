import React, { FC } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import CarouselButton from "../Carousel/CarouselButton";
import DraggableFlag from "../DraggableFlag";

export interface Props {
  codes?: string[];
  onCheckSubmission?: (submission: string) => void;
}

const DraggableFlagCarousel: FC<Props> = ({
  codes = [],
  onCheckSubmission,
}) => {
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
  );
};

export default DraggableFlagCarousel;
