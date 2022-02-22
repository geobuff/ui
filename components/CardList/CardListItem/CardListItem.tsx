import React, { FC } from "react";
import Link from "next/link";

import {
  AspectRatio,
  Box,
  GridItem,
  Link as ChakraLink,
  useBreakpointValue,
} from "@chakra-ui/react";

export interface Props {
  href: string;
  isEnabled?: boolean;
}

const CardListItem: FC<Props> = ({ isEnabled = true, href, children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <GridItem>
      <Link href={isEnabled ? href : "/"}>
        <ChakraLink>
          {isMobile ? (
            <Box
              display="inline-block"
              width="180px"
              height="210px"
              marginRight={3}
              paddingY={3}
            >
              {children}
            </Box>
          ) : (
            <AspectRatio
              maxWidth="260px"
              minHeight={{
                base: "180px",
                sm: "206px",
                md: "216px",
              }}
              maxHeight="230px"
              ratio={3 / 2}
              transition="all 150ms ease-out"
              _hover={{ transform: "scale(1.030)" }}
            >
              {children}
            </AspectRatio>
          )}
        </ChakraLink>
      </Link>
    </GridItem>
  );
};

export default CardListItem;
