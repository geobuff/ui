import React, { FC, useContext } from "react";

import { SolidLock } from "@geobuff/buff-ui/components";

import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";

import { LanguageContext } from "../../contexts/LanguageContext";

import { Badge } from "../../types/badge";
import Card from "../Card";

interface Props {
  badges?: Badge[];
}

const UserProfileAchievements: FC<Props> = ({ badges = [] }) => {
  const { t } = useContext(LanguageContext);

  const getLabel = (badge: Badge): React.ReactNode => (
    <Box>
      <Heading size="md">{badge.name}</Heading>
      <Text my={2}>{badge.description}</Text>
      <Text mb={2}>{`Progress: ${badge.progress}/${badge.total}`}</Text>
    </Box>
  );

  return (
    <Card paddingX={{ base: 4, md: 6 }} paddingY={{ base: 5, md: 6 }}>
      <Heading fontSize="26px" textAlign="left" marginLeft={2} marginBottom={8}>
        {t.userProfileAchievements.title}
      </Heading>

      <Flex direction="column" justifyContent="center" marginX={2}>
        <SimpleGrid
          mb={6}
          justifyContent="center"
          minChildWidth="75px"
          spacingY={8}
          spacingX={5}
        >
          {badges.map((badge) => (
            <Tooltip key={badge.id} label={getLabel(badge)}>
              <Box position="relative">
                <Box
                  borderRadius={50}
                  backgroundColor={badge.background || "gray.200"}
                  border="solid 5px"
                  borderColor={badge.border || "gray.600"}
                  padding={3}
                  height="75px"
                  width="75px"
                >
                  <Image
                    src={badge.imageUrl}
                    alt={`Badge ${badge.name}`}
                    height={40}
                    width={40}
                    style={{
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                    priority
                  />
                </Box>
                {badge.progress !== badge.total && (
                  <Box
                    position="absolute"
                    borderRadius={50}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    opacity={0.75}
                    backgroundColor="#292929"
                    width="75px"
                    height="75px"
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      width="100%"
                    >
                      <SolidLock height="26px" width="26px" color="white" />
                    </Flex>
                  </Box>
                )}
              </Box>
            </Tooltip>
          ))}
        </SimpleGrid>
      </Flex>
    </Card>
  );
};

export default UserProfileAchievements;
