import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Box,
  Divider,
  Heading,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";

import Twemoji from "../Twemoji";

const Sidebar = ({ heading, quiz, children }) => (
  <Box
    position="absolute"
    top={0}
    bottom={0}
    left={0}
    width="375px"
    backgroundColor="#FFF"
    boxShadow="6px 4px 4px rgba(0,0,0,0.08)"
    overflowY="scroll"
    minHeight="100%"
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      padding={4}
      paddingBottom="100px"
    >
      {!!heading && (
        <>
          <Heading mt={2} size="md">
            <Flex justifyContent="center">
              {quiz.hasLeaderboard && (
                <Link href={`/leaderboard?quizId=${quiz.id}`}>
                  <ChakraLink>
                    <Twemoji emoji="🏆" mr={2} />
                  </ChakraLink>
                </Link>
              )}
              {heading}
            </Flex>
          </Heading>
          <Divider my={5} borderColor="#E3E1E1" borderWidth={1} />
        </>
      )}

      {children}
    </Box>
  </Box>
);

Sidebar.propTypes = {
  heading: PropTypes.string,
  quiz: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mapSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    hasFlags: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  children: PropTypes.node,
};

Sidebar.defaultProps = {
  heading: "",
  quiz: {},
  children: null,
};

export default Sidebar;
