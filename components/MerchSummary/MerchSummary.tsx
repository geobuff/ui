import React, { FC, useContext } from "react";

import { ArrowLeft } from "@geobuff/buff-ui/components";

import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { MerchItem } from "../../types/merch-item";
import { MerchSummaryFormSubmit } from "../../types/merch-summary-form-submit";
import Modal from "../Modal";
import MerchSummaryDetails from "./MerchSummaryDetails";
import MerchSummaryShowcase from "./MerchSummaryShowcase";

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
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${item?.name}`} - GeoBuff</title>
        <meta
          name="description"
          content={`${item?.description.substring(0, 150)}...`}
        />
      </Head>
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
                {t.merchSummary.backToMerch}
              </Text>
            </Button>
          </Flex>
          <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent="center"
          >
            <Flex justifyContent="center">
              <Flex direction="column">
                <MerchSummaryShowcase name={item?.name} images={item?.images} />
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
        header={t.merchSummary.sizeGuide}
        hasCloseButton
      >
        <Flex justifyContent="center" margin={6}>
          {item?.sizeGuideImageUrl.Valid && (
            <Image
              src={item.sizeGuideImageUrl.String}
              alt={t.merchSummary.sizeGuide}
              width={385}
              height={513}
            />
          )}
        </Flex>
      </Modal>
    </>
  );
};

export default MerchSummary;
