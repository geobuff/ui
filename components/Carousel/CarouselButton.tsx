/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IconButton } from "@chakra-ui/react";
import React, { FC } from "react";
import ArrowLeft from "../../Icons/ArrowLeft";
import ArrowRight from "../../Icons/ArrowRight";
import OutlinedArrowCircleLeft from "../../Icons/OutlinedArrowCircleLeft";
import OutlinedArrowCircleRight from "../../Icons/OutlinedArrowCircleRight";

export type CarouselButtonPosition = "left" | "right";

export interface Props {
  position: CarouselButtonPosition;
}

const CarouselButton: FC<Props> = ({ position = "right", ...props }) => {
  const isLeft = position === "left";
  const isRight = position === "right";

  return (
    <IconButton
      aria-label={`scroll flag options ${position}`}
      position="absolute"
      outline={0}
      transition="all .5s"
      borderRadius="35px"
      zIndex={1000}
      border={0}
      boxShadow={`${
        isLeft ? "1px" : "-1px"
      } 4px 4px 2px rgb(179 187 209 / 25%)`}
      background="white"
      minWidth="40px"
      minHeight="36px"
      opacity={1}
      cursor="pointer"
      left={isLeft ? "3px" : "initial"}
      right={isRight ? "3px" : "initial"}
      _hover={{ backgroundColor: "white" }}
      {...props}
    >
      {isLeft ? (
        <ArrowLeft color="black" height={5} width={5} />
      ) : (
        <ArrowRight color="black" height={5} width={5} />
      )}
    </IconButton>
  );
};

export default CarouselButton;
