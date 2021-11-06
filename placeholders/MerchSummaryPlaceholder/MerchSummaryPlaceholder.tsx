import React, { FC } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Select,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";

interface Props {
  imageCount?: number;
}

const MerchSummaryPlaceholder: FC<Props> = ({ imageCount = 3 }) => (
  <Flex
    background="white"
    direction={{ base: "column", md: "row" }}
    width="100%"
    justifyContent="center"
    padding={12}
  >
    <Flex direction="column">
      <Skeleton
        width={{ base: "300px", md: "500px" }}
        height={{ base: "300px", md: "500px" }}
        borderRadius="12px"
      />
      <SimpleGrid mt={6} columns={{ base: 3, md: 4 }} spacingY={6}>
        {[...Array(imageCount)].map((_, i) => (
          <Skeleton key={i} width="100px" height="100px" borderRadius="12px" />
        ))}
      </SimpleGrid>
    </Flex>
    <Flex
      direction="column"
      width={{ base: "100%", md: "40%" }}
      px={{ base: 0, md: 12 }}
      mt={{ base: 12, md: 0 }}
    >
      <Skeleton height="25px" width="150px" />
      <Skeleton height="25px" width="75px" mt={3} />
      <Skeleton mt={6}>
        <Accordion defaultIndex={[0]} allowMultiple mt={6}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {"Description"}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {
                "Tee ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              }
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {"Size Guide"}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{"Size Guide"}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Skeleton>
      <Skeleton marginY={6}>
        <Select />
      </Skeleton>
      <Skeleton mt={3}>
        <Button>Add To Cart</Button>
      </Skeleton>
    </Flex>
  </Flex>
);

export default MerchSummaryPlaceholder;
