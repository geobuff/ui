/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

export type CarouselButtonPosition = "left" | "right";

export interface Props {
  position: CarouselButtonPosition;
}

const CarouselButton: FC<Props> = ({ position = "right", ...props }) => {
  const isLeft = position === "left";
  const isRight = position === "right";

  return (
    <Button
      position="absolute"
      outline={0}
      transition="all .5s"
      borderRadius="35px"
      zIndex={1000}
      border={0}
      background="rgba(0,0,0,0.5)"
      minWidth="43px"
      minHeight="43px"
      opacity={1}
      cursor="pointer"
      left={isLeft ? 1.5 : "initial"}
      right={isRight ? 1.5 : "initial"}
      _hover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      {...props}
    >
      {isLeft ? "L" : "R"}
    </Button>
  );
};

export default CarouselButton;
