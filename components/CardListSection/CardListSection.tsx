import React, { FC } from "react";
import Link from "next/link";

import {
  Flex,
  FlexProps,
  Heading,
  Link as ChakraLink,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";

import OutlinedChevronRight from "../../Icons/OutlinedChevronRight";
import CardList from "../CardList";

export interface Props extends FlexProps {
  title: string;
  linkHref?: string;
  linkVerb?: string;
  isLoading?: boolean;
}

const CardListSection: FC<Props> = ({
  title,
  linkHref,
  linkVerb,
  children,
  isLoading = false,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const spinnerSize = useBreakpointValue({ base: "sm", md: "sm" });

  if (isMobile === undefined) return null;

  return (
    <>
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        marginTop={{ base: 2.5, md: 12 }}
        marginBottom={{ base: 1, md: 5 }}
        {...props}
      >
        <Flex alignItems="center">
          <Heading fontSize={{ base: 18, md: "2xl" }}>{title}</Heading>
          {isLoading && (
            <Spinner
              marginLeft={2}
              size={spinnerSize}
              color="blue.500"
              emptyColor="green.500"
            />
          )}
        </Flex>
        {linkHref && (
          <Link href={linkHref}>
            <ChakraLink
              fontWeight="semibold"
              fontSize={{ base: "sm", md: "medium" }}
            >
              {`See all${isMobile ? "" : ` ${linkVerb}`}`}
              <OutlinedChevronRight height="18px" width="18px" mb="1px" />
            </ChakraLink>
          </Link>
        )}
      </Flex>
      <CardList>{children}</CardList>
    </>
  );
};

export default CardListSection;
