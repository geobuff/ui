import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import { AspectRatio, Flex, Alert, AlertIcon } from "@chakra-ui/react";

import ProductCard from "../ProductCard";

const MerchList = ({ merch }) => (
  <Flex
    width={{ base: "95%", sm: "85%", md: "65%" }}
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
      <Flex direction="row" width="100%" justifyContent="center">
        {merch.map((product) => (
          <Link
            key={product.id}
            href={!product.disabled ? `/merch/${product.id}` : "/"}
          >
            <AspectRatio
              width="100%"
              marginX={{ base: 1, md: 5 }}
              maxWidth="300px"
              minHeight={{ base: "220px", md: "260px" }}
              maxHeight="260px"
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
      </Flex>
    )}
  </Flex>
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
