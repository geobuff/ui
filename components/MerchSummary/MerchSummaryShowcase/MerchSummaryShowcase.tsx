import React, { FC, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import MapInteractionCSS from "../../MapInteractionCSS";
import Image from "../../Image";
import { MerchImage } from "../../../types/merch-item";

export interface Props {
  images?: MerchImage[];
}

const MerchSummaryShowcase: FC<Props> = ({ images = [] }) => {
  const current = images.find((x) => x.isPrimary);
  const [currentImage, setCurrentImage] = useState(current?.imageUrl ?? "");

  return (
    <>
      <MapInteractionCSS background="#F0F0F0" borderRadius="12px">
        <Image src={currentImage} width="500px" height="auto" />
      </MapInteractionCSS>
      <SimpleGrid mt={6} columns={{ base: 3, md: 4 }} spacingY={6}>
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.imageUrl}
            onClick={(): void => setCurrentImage(image.imageUrl)}
            width="100px"
            height="66.7px"
            objectFit="cover"
            borderRadius="12px"
            cursor="pointer"
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MerchSummaryShowcase;
