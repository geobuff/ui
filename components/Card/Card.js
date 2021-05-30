import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const Card = ({ children, ...props }) => {
  return (
    <Box
      background="#FFF"
      boxShadow="0px 4px 4px rgba(180, 180, 180, 0.25)"
      borderRadius={12}
      width="100%"
      padding={4}
      {...props}
    >
      {children}
    </Box>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};
Card.defaultProps = {
  children: null,
};

export default Card;
