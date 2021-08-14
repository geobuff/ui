import React from "react";
import PropTypes from "prop-types";

import { Fade, Td } from "@chakra-ui/react";

const TableCell = ({ children, ...props }) => (
  <Td {...props}>
    <Fade in>{children}</Fade>
  </Td>
);

TableCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};

TableCell.defaultProps = {
  children: {},
};

export default TableCell;
