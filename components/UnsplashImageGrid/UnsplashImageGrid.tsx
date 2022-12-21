import React, { FC, useContext } from "react";

import { Alert, AlertIcon, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { UnsplashImage } from "../../types/unsplash-image";
import RadioImage from "../RadioImage";

export interface Props {
  images?: UnsplashImage[];
  isSearching?: boolean;
  isEmptySearch?: boolean;
  imageUrlRadioGroup?: any;
  getImageUrlRadioProps?: any;
}

const UnsplashImageGrid: FC<Props> = ({
  images = [],
  isSearching = false,
  isEmptySearch = false,
  imageUrlRadioGroup = null,
  getImageUrlRadioProps = () => {},
}) => {
  const { t } = useContext(LanguageContext);

  if (isSearching) {
    return (
      <Flex justifyContent="center" mt={6}>
        <Spinner size="md" color="blue.500" emptyColor="green.500" />
      </Flex>
    );
  }

  if (isEmptySearch) {
    return (
      <Alert status="info" borderRadius={6} marginBottom={3}>
        <AlertIcon />
        {t.unsplashImageGrid.noImagesFound}
      </Alert>
    );
  }

  return (
    <SimpleGrid
      columns={5}
      spacing={6}
      my={images.length > 0 && 6}
      {...imageUrlRadioGroup}
    >
      {images.map((image, index) => {
        const radio = getImageUrlRadioProps({
          value: image.url,
          enterKeyHint: "imageUrl",
        });

        return (
          <RadioImage
            key={index}
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            radioProps={radio}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default UnsplashImageGrid;
