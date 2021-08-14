import React from "react";
import PropTypes from "prop-types";

import { Flex } from "@chakra-ui/react";

const AuthCard = ({ height, width, children, ...props }) => {
  return (
    <Flex
      backgroundColor="white"
      borderRadius={12}
      boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
      direction="column"
      padding={5}
      height={height}
      width={width}
      {...props}
    >
      {children}
    </Flex>
  );
};

AuthCard.propTypes = {
  children: PropTypes.object,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
};
AuthCard.defaultProps = {
  children: null,
  height: 560,
  width: 375,
};

export default AuthCard;
