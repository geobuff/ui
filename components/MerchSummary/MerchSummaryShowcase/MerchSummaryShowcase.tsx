import React, { FC, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import MapInteractionCSS from "../../MapInteractionCSS";
import Image from "next/image";
import { MerchImage } from "../../../types/merch-item";

export interface Props {
  name?: string;
  images?: MerchImage[];
}

const MerchSummaryShowcase: FC<Props> = ({ name = "", images = [] }) => {
  const current = images.find((x) => x.isPrimary);
  const [currentImage, setCurrentImage] = useState(current?.imageUrl ?? "");

  return (
    <>
      <MapInteractionCSS
        background="#F0F0F0"
        borderRadius="12px"
        maxHeight={{ base: "235px", sm: "333px" }}
      >
        <Image
          src={currentImage}
          alt={`Primary showcase for ${name}`}
          width={500}
          height={333}
          objectFit="cover"
          priority
        />
      </MapInteractionCSS>
      <SimpleGrid mt={6} columns={{ base: 3, md: 4 }} spacingY={6}>
        {images.map((image) => (
          <Box key={image.id} maxWidth="100px">
            <Image
              src={image.imageUrl}
              alt={`Secondary option for ${name}`}
              width={100}
              height={66.7}
              objectFit="cover"
              style={{
                borderRadius: "12px",
                cursor: "pointer",
              }}
              onClick={(): void => setCurrentImage(image.imageUrl)}
              priority
            />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MerchSummaryShowcase;
