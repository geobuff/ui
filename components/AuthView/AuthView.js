import React from "react";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";

const AuthView = ({ height, children, ...props }) => {
  return (
    <Flex
      marginTop={6}
      height={height}
      direction="column"
      justifyContent="center"
      {...props}
    >
      {children}
    </Flex>
  );
};

AuthView.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  children: PropTypes.object,
};
AuthView.defaultProps = {
  height: "80vh",
  children: null,
};

export default AuthView;
