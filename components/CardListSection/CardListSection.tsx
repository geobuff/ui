import React, { FC } from "react";
import Link from "next/link";

import {
  Flex,
  FlexProps,
  Heading,
  Link as ChakraLink,
  useBreakpointValue,
} from "@chakra-ui/react";

import OutlinedChevronRight from "../../Icons/OutlinedChevronRight";
import CardList from "../CardList";

export interface Props extends FlexProps {
  title: string;
  linkHref: string;
  linkVerb: string;
}

const CardListSection: FC<Props> = ({
  title,
  linkHref,
  linkVerb,
  children,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

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
        <Heading fontSize={{ base: 18, md: "2xl" }}>{title}</Heading>
        <Link href={linkHref}>
          <ChakraLink
            fontWeight="semibold"
            fontSize={{ base: "sm", md: "medium" }}
          >
            {`See all${isMobile ? "" : ` ${linkVerb}`}`}
            <OutlinedChevronRight height="18px" width="18px" mb="1px" />
          </ChakraLink>
        </Link>
      </Flex>
      <CardList>{children}</CardList>
    </>
  );
};

export default CardListSection;
