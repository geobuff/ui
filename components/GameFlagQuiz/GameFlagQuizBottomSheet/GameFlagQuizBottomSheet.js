import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Fade,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

import Twemoji from "../../Twemoji";
import ResultsMap from "../../ResultsMap";
import GameFlags from "../../GameFlags";
import { groupMapping } from "../../../helpers/mapping";

import { ItemTypes } from "../../../helpers/item-types";

import { useDrag } from "react-dnd";

import { motion } from "framer-motion";

const GameFlagQuizBottomSheet = ({
  checkedSubmissions,
  mapping,
  quiz,
  flagDragItems,
  hasGameStarted,
  hasGameRunOnce,
  hasGameStopped,
  onCheckSubmission,
  onGameStop,
  onGameStart,
}) => {
  const [showResultList, setShowResultsList] = useState(false); // TODO: Consider renaming to something modal related

  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const variants = {
    open: { top: "20%" },
    closed: { top: "calc(100% - 260px)" },
  };

  const opacityVariants = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  };

  useEffect(() => {
    console.log(dragStart - dragEnd, "dragStart - dragEnd");
    if (dragStart - dragEnd === 0) {
      setShowResultsList(true);
    }
  }, [dragEnd]);

  console.log(showResultList, "showResultList");

  const handleDrag = (event, info) => {
    console.log(info.point.x, info.point.y);
    setDragStart(info.point.x);
    console.log("handleDrag start called");
    // setShowResultsList(true);
  };

  const handleDragEnd = (event, info) => {
    console.log(info.point.x, info.point.y);
    console.log("handleDrag end called");
    setDragEnd(info.point.x);
    // setShowResultsList(true);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FLAG,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log("emd");
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      animate={showResultList ? "open" : "closed"}
      variants={variants}
      // drag="y"
      dragConstraints={{ bottom: 0, top: 0 }}
      onDragStart={handleDrag}
      onDragEnd={handleDragEnd}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      style={{
        display: "inline-block",
        backgroundColor: isDragging ? "red" : "white",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
    >
      <Flex
        direction="column"
        backgroundColor="white"
        p={4}
        borderTopRadius={12}
      >
        <Heading pt={2} size="md">
          <Flex justifyContent="center">
            {quiz.hasLeaderboard && (
              <Link href={`/leaderboard?quizId=${quiz.id}`}>
                <ChakraLink>
                  <Twemoji emoji="🏆" mr={2} />
                </ChakraLink>
              </Link>
            )}
            {quiz.name}
          </Flex>
        </Heading>

        <Divider my={4} />

        <Box>
          {!showResultList && (
            <Fade in unmountOnExit>
              <GameFlags
                codes={flagDragItems}
                onCheckSubmission={onCheckSubmission}
                //   onCheckSubmission={(submission) =>
                //     setCurrentSubmission(submission)
                //   }
              />
              <Button
                colorScheme={hasGameStarted ? "red" : "green"}
                isFullWidth
                onClick={hasGameStarted ? onGameStop : onGameStart}
                p={7}
                size="md"
              >
                <Text fontWeight="700" fontSize="22px">
                  {hasGameStarted
                    ? "GIVE UP"
                    : hasGameRunOnce
                    ? "RETRY"
                    : "START"}
                </Text>
              </Button>
            </Fade>
          )}

          <Button
            my={4}
            isFullWidth
            variant="outline"
            onClick={() => setShowResultsList(!showResultList)}
          >
            {"Results"}
          </Button>

          {showResultList && (
            <Fade in unmountOnExit>
              <ResultsMap
                quiz={quiz}
                checked={checkedSubmissions}
                map={groupMapping(mapping)}
                hasGameStopped={hasGameStopped}
                hasGroupings={quiz.hasGrouping}
                hasFlags={quiz.hasFlags}
              />
            </Fade>
          )}
        </Box>
      </Flex>
    </motion.div>
  );
};

GameFlagQuizBottomSheet.propTypes = {};
GameFlagQuizBottomSheet.defaultProps = {};

export default GameFlagQuizBottomSheet;
