import React, { FC, useContext } from "react";

import {
  Divider,
  Flex,
  FlexProps,
  Text,
  TextProps,
  useBreakpointValue,
} from "@chakra-ui/react";

import { LanguageContext } from "../../../contexts/LanguageContext";

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

const GameTriviaHeader: FC<Props> = ({
  name = "",
  questionNumber = 1,
  maxQuestionNumber = 10,
  ...props
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column" {...props}>
      <Flex justifyContent="space-between">
        <HeaderText>{name}</HeaderText>
        <HeaderText>
          {`${!isMobile ? t.global.question : ""} ${questionNumber} ${
            t.global.of
          } ${maxQuestionNumber}`}
        </HeaderText>
      </Flex>

      <Divider borderColor="white" opacity={1} borderWidth={1} marginY={3} />
    </Flex>
  );
};

export default GameTriviaHeader;
