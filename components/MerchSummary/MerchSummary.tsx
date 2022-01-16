import React, { FC } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";

import Image from "../Image";
import Modal from "../Modal";
import { MerchItem } from "../../types/merch-item";
import { MerchSummaryFormSubmit } from "../../types/merch-summary-form-submit";
import MerchSummaryShowcase from "./MerchSummaryShowcase";
import MerchSummaryDetails from "./MerchSummaryDetails";

interface Props {
  item?: MerchItem;
  isSubmitting?: boolean;
  onSubmit?: (values: MerchSummaryFormSubmit) => void;
  submitted?: boolean;
}

const MerchSummary: FC<Props> = ({
  item = null,
  isSubmitting = false,
  onSubmit = () => {},
  submitted = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        background="white"
        width="100%"
        justifyContent="center"
        padding={{ base: 6, md: 12 }}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          justifyContent="center"
          width="100%"
          maxWidth={1400}
          marginX="auto"
        >
          <Flex justifyContent="center">
            <Flex direction="column">
              <MerchSummaryShowcase images={item?.images} />
            </Flex>
          </Flex>
          <Flex
            direction="column"
            width={{ base: "100%", lg: "45%" }}
            px={{ base: 0, lg: 12 }}
            mt={{ base: 12, lg: 0 }}
          >
            <MerchSummaryDetails
              name={item?.name}
              price={item?.price.Float64}
              description={item?.description}
              sizeGuideImageUrl={
                item?.sizeGuideImageUrl.Valid && item?.sizeGuideImageUrl.String
              }
              sizes={item?.sizes}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              submitted={submitted}
              onOpen={onOpen}
            />
          </Flex>
        </Flex>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Size Guide"
        hasCloseButton
      >
        <Flex justifyContent="center" margin={6}>
          <Image
            src={item?.sizeGuideImageUrl.String}
            alt="Size Guide"
            width="100%"
            height="auto"
          />
        </Flex>
      </Modal>
    </>
  );
};

export default MerchSummary;
