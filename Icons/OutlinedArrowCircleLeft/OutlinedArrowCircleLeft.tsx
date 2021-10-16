import React, { FC } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const OutlinedArrowCircleLeft: FC<IconProps> = ({ ...props }) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-3.707 9.293 3-3a1 1 0 1 1 1.414 1.414L11.414 11H15a1 1 0 1 1 0 2h-3.586l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414Z"
    />
  </Icon>
);

export default OutlinedArrowCircleLeft;
