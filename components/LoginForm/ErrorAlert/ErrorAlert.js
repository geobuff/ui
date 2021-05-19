import React from "react";
import PropTypes from "prop-types";

import { Alert, AlertIcon, Box, Fade, Flex, Text } from "@chakra-ui/react";

const ErrorAlert = ({ error }) => (
  <Fade in={error} out={!error}>
    <Box marginY={2}>
      <Alert
        width="100%"
        status="error"
        backgroundColor="transparent"
        variant="subtle"
        borderRadius={6}
        marginY={2}
        paddingLeft={0}
        height="30px"
      >
        <Flex alignItems="center">
          <AlertIcon
            color="red.400"
            height="15px"
            marginRight={2}
            marginTop="1px"
          />
          <Text color="red.500" fontWeight="500" fontSize="14px">
            {error}
          </Text>
        </Flex>
      </Alert>
    </Box>
  </Fade>
);

ErrorAlert.propTypes = {
  error: PropTypes.string,
};
ErrorAlert.defaultProps = {
  error: "",
};

export default ErrorAlert;
