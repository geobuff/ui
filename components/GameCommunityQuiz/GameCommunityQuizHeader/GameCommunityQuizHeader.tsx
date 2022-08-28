import React, { FC } from "react";
import {
  Divider,
  Flex,
  FlexProps,
  Text,
  TextProps,
  useBreakpointValue,
} from "@chakra-ui/react";

export interface Props extends FlexProps {
  name?: string;
  questionNumber?: number;
  maxQuestionNumber?: number;
}

const HeaderText: FC<TextProps> = ({ children, ...props }) => (
  <Text
    color="white"
    fontSize={{ base: "sm", md: "lg" }}
    fontWeight="bold"
    {...props}
  >
    {children}
  </Text>
);

const GameCommunityQuizHeader: FC<Props> = ({
  name = "",
  questionNumber = 1,
  maxQuestionNumber = 10,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: true });

  return (
    <Flex direction="column" {...props}>
      <Flex justifyContent="space-between">
        <HeaderText>{name}</HeaderText>
        <HeaderText>
          {`${
            !isMobile ? "Question" : ""
          } ${questionNumber} of ${maxQuestionNumber}`}
        </HeaderText>
      </Flex>

      <Divider borderColor="white" opacity={1} borderWidth={1} marginY={3} />
    </Flex>
  );
};

export default GameCommunityQuizHeader;
