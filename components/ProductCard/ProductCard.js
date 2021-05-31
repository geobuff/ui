import React from "react";
import PropTypes from "prop-types";

import { Box, Image, Text } from "@chakra-ui/react";

const ProductCard = ({ imageUrl, name, price }) => (
  <Box backgroundColor="white" borderRadius={12}>
    <Image
      src={imageUrl}
      maxHeight={{ base: "75px", md: "90px" }}
      minHeight={{ base: "75px", md: "90px" }}
      backgroundColor="#E3E1E1"
      width="100%"
      borderTopLeftRadius={12}
      borderTopRightRadius={12}
      objectFit="cover"
      transition="all 150ms ease-out"
      _groupHover={{
        maxHeight: { base: "80px", md: "88px" },
        minHeight: { base: "80px", md: "88px" },
      }}
    />

    <Box paddingTop="12px" paddingX="12px" textAlign="center">
      <Text
        fontWeight="bold"
        fontSize="18px"
        marginBottom="16px"
        noOfLines={3}
        _groupHover={{ textDecoration: "underline" }}
      >
        {name}
      </Text>
      <Text>${price}</Text>
    </Box>
  </Box>
);

ProductCard.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};
ProductCard.defaultProps = {
  imageUrl: "",
  name: "",
  price: 0.0,
};

export default ProductCard;
