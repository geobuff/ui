import React, { FC } from "react";
import { AspectRatio, Flex, Alert, AlertIcon, Link } from "@chakra-ui/react";

import ProductCard from "../ProductCard";
import { MerchItem } from "../../types/merch-item";

interface Props {
  merch?: MerchItem[];
}

const MerchList: FC<Props> = ({ merch = [] }) => (
  <Flex
    width={{ base: "95%", sm: "85%", md: "65%" }}
    maxWidth="1200px"
    marginTop="32px"
    marginBottom={10}
    marginLeft="auto"
    marginRight="auto"
  >
    {merch.length === 0 ? (
      <Alert status="info" borderRadius={6} p={5} mt={5}>
        <AlertIcon />
        {"No merch to display."}
      </Alert>
    ) : (
      <Flex direction="row" width="100%" justifyContent="center">
        {merch.map((product) => (
          <AspectRatio
            key={product.id}
            width="100%"
            marginX={{ base: 1, md: 5 }}
            maxWidth="300px"
            minHeight={{ base: "220px", md: "260px" }}
            maxHeight="260px"
            ratio={3 / 2}
            transition="all 150ms ease-out"
            _hover={{
              transform: "scale(1.030)",
              cursor: "pointer",
            }}
          >
            <Link
              key={product.id}
              href={
                product.externalLink.Valid
                  ? product.externalLink.String
                  : `/merch/${product.id}`
              }
              backgroundColor="white"
              borderRadius={12}
              boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
            >
              <ProductCard
                name={product.name}
                imageUrl={
                  product.images.find((image) => image.isPrimary).imageUrl
                }
                price={product.price.Valid && product.price.Float64}
                sizes={product.sizes.map((x) => x.size)}
                soldOut={product.soldOut}
                isExternal={product.externalLink.Valid}
              />
            </Link>
          </AspectRatio>
        ))}
      </Flex>
    )}
  </Flex>
);

export default MerchList;
