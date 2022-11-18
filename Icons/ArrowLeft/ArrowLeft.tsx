import React, { FC } from "react";

import { Icon } from "@chakra-ui/react";

interface Props {
  [x: string]: any;
}

const ArrowLeft: FC<Props> = ({ ...props }) => (
  <Icon {...props}>
    <path
      d="M5 12l6-6m-6 6l6 6m-6-6h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ArrowLeft;
