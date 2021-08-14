import React from "react";
import PropTypes from "prop-types";
import { Link, Image, Box, Text } from "@chakra-ui/react";

const TeamMemberCard = ({ title, position, city, country, imageUrl, link }) => (
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

TeamMemberCard.propTypes = {
  title: PropTypes.string,
  position: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  imageUrl: PropTypes.string,
  link: PropTypes.string,
};

export default TeamMemberCard;
