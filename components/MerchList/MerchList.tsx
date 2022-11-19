import React, { FC } from "react";

import {
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";

import { MerchItem } from "../../types/merch-item";
import MerchCard from "../MerchCard";

interface Props {
  merch?: MerchItem[];
}

const MerchList: FC<Props> = ({ merch = [] }) => (
  <Box
    width="100%"
    maxWidth={1300}
    marginTop="32px"
    marginBottom={10}
    marginLeft="auto"
    marginRight="auto"
    paddingX={{ base: 3, md: 10 }}
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
      <SimpleGrid
        minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
        spacing={{ base: "16px", md: "24px" }}
      >
        {merch.map((product) => (
          <Link
            key={product.id}
            href={
              product.externalLink.Valid
                ? product.externalLink.String
                : `/merch/${product.route}`
            }
          >
            <AspectRatio
              maxWidth="260px"
              minHeight={{ base: "225px", md: "250px" }}
              maxHeight="250px"
              ratio={1}
              transition="all 150ms ease-out"
              _hover={{ transform: "scale(1.030)" }}
            >
              <MerchCard
                name={product.name}
                imageUrl={
                  product.images.find((image) => image.isPrimary)?.imageUrl
                }
                price={product.price.Valid && product.price.Float64}
                sizes={product.sizes.map((x) => x.size)}
                soldOut={product.soldOut}
                isExternal={product.externalLink.Valid}
              />
            </AspectRatio>
          </Link>
        ))}
      </SimpleGrid>
    )}
  </Box>
);

export default MerchList;
