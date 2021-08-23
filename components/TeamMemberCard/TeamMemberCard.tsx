import React, { FC } from "react";
import { Link, Image, Box, Text } from "@chakra-ui/react";

interface Props {
  title?: string;
  position?: string;
  city?: string;
  country?: string;
  imageUrl?: string;
  link?: string;
}

const TeamMemberCard: FC<Props> = ({ title="", position="", city="", country="", imageUrl="", link="" }) => (
  <Box textAlign="center">
    <Link href={link}>
      <Image
        src={imageUrl}
        height="160px"
        width="160px"
        borderRadius="100%"
        mx="auto"
      />
    </Link>
    <Box>
      <Box fontSize="16px" lineHeight="19px" mb={3}>
        <Text fontWeight="bold" mt={6}>
          {title}
        </Text>
        <Text mb={1}>{position}</Text>
      </Box>
      <Box color="#737373" fontSize="12px" lineHeight="14px">
        <Text>{city},</Text>
        <Text>{country}</Text>
      </Box>
    </Box>
  </Box>
);

export default TeamMemberCard;
