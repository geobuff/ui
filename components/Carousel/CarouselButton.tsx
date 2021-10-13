/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IconButton } from "@chakra-ui/react";
import React, { FC } from "react";
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
      boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
      background="white"
      minWidth="43px"
      minHeight="43px"
      opacity={1}
      cursor="pointer"
      left={isLeft ? 1 : "initial"}
      right={isRight ? 1 : "initial"}
      _hover={{ backgroundColor: "white" }}
      {...props}
    >
      {isLeft ? (
        <OutlinedArrowCircleLeft color="black" height={8} width={8} />
      ) : (
        <OutlinedArrowCircleRight color="black" height={8} width={8} />
      )}
    </IconButton>
  );
};

export default CarouselButton;
