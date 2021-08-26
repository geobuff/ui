import React, { FC } from "react";
import Link from "next/link";
import {
  Box,
  Divider,
  Heading,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";

import Twemoji from "../Twemoji";
import { Quiz } from "../../types/quiz";

interface Props {
  heading?: string;
  quiz?: Quiz;
}

const Sidebar: FC<Props> = ({ heading = "", quiz = {}, children = null }) => (
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
      bottom={0}
      padding={4}
      paddingBottom="100px"
      minHeight="1000px"
    >
      {!!heading && (
        <>
          <Flex mt={14} justifyContent="center">
            <Heading size="md" textAlign="center">
              {quiz.hasLeaderboard && (
                <Link href={`/leaderboard?quizId=${quiz.id}`}>
                  <ChakraLink>
                    <Twemoji
                      emoji="🏆"
                      height="22px"
                      width="22px"
                      pt={1}
                      mr={2}
                    />
                  </ChakraLink>
                </Link>
              )}
              {heading}
            </Heading>
          </Flex>
          <Divider my={5} borderColor="#E3E1E1" borderWidth={1} />
        </>
      )}

      {children}
    </Box>
  </Box>
);

export default Sidebar;
