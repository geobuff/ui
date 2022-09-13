import React, { FC } from "react";

import { Fade, Td } from "@chakra-ui/react";

interface Props {
  [x: string]: any;
}

const TableCell: FC<Props> = ({ children = {}, ...props }) => (
  <Td {...props}>
    <Fade in>{children}</Fade>
  </Td>
);

export default TableCell;
