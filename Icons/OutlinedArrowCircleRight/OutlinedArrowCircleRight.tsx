import React, { FC } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const OutlinedArrowCircleRight: FC<IconProps> = ({ ...props }) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm3.707 9.293-3-3a1 1 0 1 0-1.414 1.414L12.586 11H9a1 1 0 1 0 0 2h3.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414Z"
    />
  </Icon>
);

export default OutlinedArrowCircleRight;
