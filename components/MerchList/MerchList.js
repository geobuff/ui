import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { Box, SimpleGrid, Link as ChakraLink } from "@chakra-ui/react";

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
    <SimpleGrid
      justifyContent="center"
      columns={{ base: 1, sm: 2 }}
      spacing={{ base: "50px", sm: "24px" }}
    >
      {merch.map((product) => (
        <Link key={product.id} href={`/merch/${product.id}`}>
          <ChakraLink>
            <ProductCard
              imageUrl={product.imageUrls[0]}
              name={product.name}
              price={product.price}
            />
          </ChakraLink>
        </Link>
      ))}
    </SimpleGrid>
  </Box>
);

MerchList.propTypes = {
  merch: PropTypes.arrayOf(PropTypes.object),
};

export default MerchList;
