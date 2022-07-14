import React, { FC } from "react";
import { Button, Flex, useDisclosure, Text } from "@chakra-ui/react";

import Image from "../Image";
import Modal from "../Modal";
import { MerchItem } from "../../types/merch-item";
import { MerchSummaryFormSubmit } from "../../types/merch-summary-form-submit";
import MerchSummaryShowcase from "./MerchSummaryShowcase";
import MerchSummaryDetails from "./MerchSummaryDetails";
import ArrowLeft from "../../Icons/ArrowLeft";
import { useRouter } from "next/router";

interface Props {
  item?: MerchItem;
  isAvailable?: (sizeId: number) => boolean;
  isSubmitting?: boolean;
  onSubmit?: (values: MerchSummaryFormSubmit) => void;
  submitted?: boolean;
}

const MerchSummary: FC<Props> = ({
  item = null,
  isAvailable = (sizeId: number): boolean => false,
  isSubmitting = false,
  onSubmit = () => {},
  submitted = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Flex
        background="white"
        width="100%"
        justifyContent="center"
        padding={{ base: 6, md: 12 }}
      >
        <Flex direction="column" width="100%" maxWidth={1400} marginX="auto">
          <Flex mb={6}>
            <Button
              alignItems="center"
              backgroundColor="transparent"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => router.push("/merch")}
            >
              <ArrowLeft height={5} width={5} marginRight={1} />
              <Text fontWeight="bold" fontSize="14px">
                {"Back to Merch"}
              </Text>
            </Button>
          </Flex>
          <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent="center"
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
                  item?.sizeGuideImageUrl.Valid &&
                  item?.sizeGuideImageUrl.String
                }
                sizes={item?.sizes}
                isAvailable={isAvailable}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                submitted={submitted}
                onOpen={onOpen}
              />
            </Flex>
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
