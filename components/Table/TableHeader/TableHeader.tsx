import React, { FC } from "react";

import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";

interface Action {
  name: string;
  callback: () => void;
}

interface Props {
  heading: string;
  actions?: Action[];
}

const TableHeader: FC<Props> = ({ heading = "", actions = [] }) => (
  <>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom={5}
      marginX={2}
    >
      <Heading fontSize="24px">{heading}</Heading>

      <Box>
        {actions.map((action, index) => (
          <Button
            key={index}
            colorScheme="teal"
            size="md"
            onClick={action.callback}
            mr={actions.length > 1 && index !== actions.length - 1 && 3}
          >
            {action.name}
          </Button>
        ))}
      </Box>
    </Flex>
    <Divider borderWidth={1} marginBottom={6} />
  </>
);

export default TableHeader;
