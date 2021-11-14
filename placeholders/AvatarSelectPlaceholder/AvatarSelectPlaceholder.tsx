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

const AvatarSelectPlaceholder: FC<Props> = ({ avatarCount = 6 }) => (
  <>
    <Flex>
      <Flex direction="column" justifyContent="center" mr={6}>
        <Skeleton
          borderRadius="12px"
          height="130px"
          width="130px"
          marginBottom={6}
          marginX="auto"
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Skeleton mx="auto" mb={2} height="20px" width="100px" />
        <SkeletonText mb={12} noOfLines={6} mt={3} />
      </Flex>
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
