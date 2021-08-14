import React from "react";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";

const AuthView = ({ height, marginTop, children, ...props }) => {
  return (
    <Flex
      marginTop={marginTop}
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
  marginTop: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  children: PropTypes.object,
};
AuthView.defaultProps = {
  marginTop: 6,
  height: "80vh",
  children: null,
};

export default AuthView;
