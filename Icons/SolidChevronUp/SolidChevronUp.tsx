import React, { FC } from "react";
import { Icon } from "@chakra-ui/react";

interface Props {
  [x:string]: any;
}

const SolidChevronUp: FC<Props> = ({...props}) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      d="M18 16a1 1 0 00.707-1.707l-6-6a1 1 0 00-1.414 0l-6 6A1 1 0 006 16h12z"
    />
  </Icon>
);

export default SolidChevronUp;
