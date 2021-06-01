import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import {
  AspectRatio,
  Box,
  Alert,
  AlertIcon,
  SimpleGrid,
} from "@chakra-ui/react";

import ProductCard from "../ProductCard";

const MerchList = ({ merch }) => (
  <Box
    width={{ base: "95%", sm: "80%", md: "65%" }}
    maxWidth="1200px"
    marginTop="32px"
    marginBottom={10}
    marginLeft="auto"
    marginRight="auto"
    _hover={{
      cursor: "pointer",
    }}
  >
    {merch.length === 0 ? (
      <Alert status="info" borderRadius={6} p={5} mt={5}>
        <AlertIcon />
        {"No merch to display."}
      </Alert>
    ) : (
      <>
        <SimpleGrid
          justifyContent="center"
          minChildWidth={{ base: "140px", sm: "185px", md: "200px" }}
          spacing={{ base: "16px", md: "24px" }}
        >
          {merch.map((product) => (
            <Link
              key={product.id}
              href={!product.disabled ? `/merch/${product.id}` : "/"}
            >
              <AspectRatio
                width="100%"
                marginX="auto"
                maxW="260px"
                minHeight="200px"
                maxHeight="220px"
                ratio={3 / 2}
                transition="all 150ms ease-out"
                _hover={!product.disabled && { transform: "scale(1.030)" }}
                opacity={product.disabled ? "0.25" : "1"}
              >
                <ProductCard
                  name={product.name}
                  imageUrl={
                    product.images.find((image) => image.isPrimary).imageUrl
                  }
                  price={product.price}
                  sizes={product.sizes
                    .filter((size) => !size.soldOut)
                    .map((x) => x.size)}
                />
              </AspectRatio>
            </Link>
          ))}
        </SimpleGrid>
      </>
    )}
  </Box>
);

MerchList.propTypes = {
  merch: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      disabled: PropTypes.bool,
      sizes: PropTypes.arrayOf(
        PropTypes.shape({
          size: PropTypes.string,
          soldOut: PropTypes.bool,
        })
      ),
      images: PropTypes.arrayOf(
        PropTypes.shape({
          imageUrl: PropTypes.string,
          isPrimary: PropTypes.bool,
        })
      ),
    })
  ),
};
MerchList.defaultProps = {
  merch: [],
};

export default MerchList;
