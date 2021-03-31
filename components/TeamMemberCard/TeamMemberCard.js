import React from "react";
import PropTypes from "prop-types";
import { Link, Image, Box, Heading, Text } from "@chakra-ui/react";

import User from "../../Icons/User";
import LocationMarker from "../../Icons/LocationMarker";

const TeamMemberCard = ({ title, position, location, imageUrl, link }) => (
  <Link
    href={link}
    borderRadius={12}
    boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
    transition="all 150ms ease-out"
    _hover={{ transform: "scale(1.030)" }}
  >
    <Image src={imageUrl} borderTopLeftRadius={12} borderTopRightRadius={12} />
    <Box p={6}>
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text>
        <User mr={1} /> {position}
      </Text>
      <Text>
        <LocationMarker mr={1} /> {location}
      </Text>
    </Box>
  </Link>
);

TeamMemberCard.propTypes = {
  title: PropTypes.string,
  position: PropTypes.string,
  location: PropTypes.string,
  imageUrl: PropTypes.string,
  link: PropTypes.string,
};

export default TeamMemberCard;
