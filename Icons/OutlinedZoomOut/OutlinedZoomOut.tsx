import React, { FC } from "react";
import { Icon } from "@chakra-ui/react";

interface Props {
  [x:string]: any;
}

const OutlinedZoomOut: FC<Props> = ({...props}) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      d="M2 9c0-3.866 3.134-7 7-7s7 3.134 7 7c0 1.9333-.7824 3.6819-2.0503 4.9497C12.6819 15.2176 10.9333 16 9 16c-3.866 0-7-3.134-7-7zm7-9C4.0294 0 0 4.0294 0 9s4.0294 9 9 9c2.1246 0 4.0784-.7372 5.6176-1.9681l3.6753 3.6752c.3905.3905 1.0237.3905 1.4142 0 .3905-.3905.3905-1.0237 0-1.4142l-3.6752-3.6753C17.2628 13.0784 18 11.1246 18 9c0-4.9706-4.0294-9-9-9zM6 8c-.5523 0-1 .4477-1 1s.4477 1 1 1h6c.5523 0 1-.4477 1-1s-.4477-1-1-1H6z"
    />
  </Icon>
);

export default OutlinedZoomOut;
