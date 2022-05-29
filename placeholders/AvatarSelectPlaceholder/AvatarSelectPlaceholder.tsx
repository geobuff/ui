import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface Props {
  avatarCount?: number;
}

const AvatarSelectPlaceholder: FC<Props> = ({ avatarCount = 9 }) => (
  <>
    <Flex direction="column">
      <Skeleton
        borderRadius="12px"
        height="100px"
        width="100px"
        marginX="auto"
      />
      <Skeleton mx="auto" marginY={4} height="20px" width="100px" />
      <SkeletonText mb={6} noOfLines={6} />
    </Flex>

    <SimpleGrid background="#F0F0F0" borderRadius="12px" columns={3}>
      {[...Array(avatarCount)].map((_, i) => (
        <Box key={i} p={3}>
          <Skeleton
            borderRadius={"100%"}
            padding={3}
            height="58px"
            width="58px"
            marginX="auto"
          />
        </Box>
      ))}
    </SimpleGrid>
  </>
);

export default AvatarSelectPlaceholder;
