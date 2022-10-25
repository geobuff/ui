import React, { FC, useContext } from "react";

import {
  Flex,
  FlexProps,
  Heading,
  Link,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";

import OutlinedChevronRight from "../../Icons/OutlinedChevronRight";
import CardList from "../CardList";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export interface Props extends FlexProps {
  title: string;
  linkHref?: string;
  linkVerb?: string;
  isLoading?: boolean;
  lessItemsThanGrid?: boolean;
}

const CardListSection: FC<Props> = ({
  title,
  linkHref,
  linkVerb,
  children,
  isLoading = false,
  lessItemsThanGrid = false,
  ...props
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

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
              size="sm"
              color="blue.500"
              emptyColor="green.500"
            />
          )}
        </Flex>
        {linkHref && (
          <Link
            href={linkHref}
            fontWeight="semibold"
            fontSize={{ base: "sm", md: "medium" }}
          >
            {`${t.global.seeAll}${isMobile ? "" : ` ${linkVerb}`}`}
            <OutlinedChevronRight height="16px" width="16px" mb="1px" />
          </Link>
        )}
      </Flex>
      <CardList lessItemsThanGrid={lessItemsThanGrid}>{children}</CardList>
    </>
  );
};

export default CardListSection;
