import React, { FC } from "react";
import { Heading, Flex, Button, Divider } from "@chakra-ui/react";

interface Props {
  heading: string;
  action?: string;
  onClick?: () => void;
}

const TableHeader: FC<Props> = ({
  heading = "",
  action = "",
  onClick = (): void => {},
}) => (
  <>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom={5}
      marginX={2}
    >
      <Heading fontSize="24px">{heading}</Heading>

      {action && (
        <Button colorScheme="teal" size="md" onClick={onClick}>
          {action}
        </Button>
      )}
    </Flex>
    <Divider borderWidth={1} marginBottom={6} />
  </>
);

export default TableHeader;
