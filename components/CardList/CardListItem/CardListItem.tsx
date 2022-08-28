import React, { FC } from "react";

import {
  AspectRatio,
  Box,
  GridItem,
  GridItemProps,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";

export interface Props extends GridItemProps {
  href: string;
  isEnabled?: boolean;
}

const CardListItem: FC<Props> = ({
  href,
  isEnabled = true,
  children,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: true });

  return (
    <GridItem {...props}>
      <Link href={isEnabled ? href : "/"}>
        {isMobile ? (
          <Box
            display="inline-block"
            width="180px"
            height="210px"
            marginRight={3}
            paddingY={3}
            opacity={!isEnabled ? "0.25" : "1"}
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
            _hover={isEnabled && { transform: "scale(1.030)" }}
            opacity={!isEnabled ? "0.25" : "1"}
          >
            {children}
          </AspectRatio>
        )}
      </Link>
    </GridItem>
  );
};

export default CardListItem;
