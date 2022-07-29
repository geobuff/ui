import React, { FC } from "react";
import { Link, Box, Text } from "@chakra-ui/react";
import ProfileUserAvatar from "../ProfileUserAvatar";

interface Props {
  title?: string;
  position?: string;
  city?: string;
  country?: string;
  primaryImageUrl?: string;
  secondaryImageUrl?: string;
  link?: string;
}

const TeamMemberCard: FC<Props> = ({
  title = "",
  position = "",
  city = "",
  country = "",
  primaryImageUrl = "",
  secondaryImageUrl = "",
  link = "",
}) => (
  <Box textAlign="center">
    <Link href={link} isExternal>
      <ProfileUserAvatar
        primaryImageUrl={primaryImageUrl}
        secondaryImageUrl={secondaryImageUrl}
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
