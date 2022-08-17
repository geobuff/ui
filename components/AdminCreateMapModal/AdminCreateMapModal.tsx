import React, { FC, useEffect, useState } from "react";
import { Divider, Flex, Heading, useToast } from "@chakra-ui/react";
import Modal from "../Modal";
import { SVGBase } from "../../types/svg-base";
import AdminCreateMapPreview from "./AdminCreateMapPreview";
import AdminCreateMapMappingsForm from "./AdminCreateMapMappingsForm";
import { CreateMappingsSubmit } from "../../types/create-mappings-submit";
import { CreateMappingEntry } from "../../types/create-mapping-entry";
import { QuizFormSubmit } from "../../types/quiz-form-submit";
import AdminQuizForm from "../AdminQuizForm";
import useQuizTypes from "../../hooks/UseQuizTypes";
import useContinents from "../../hooks/UseContinents";
import useBadges from "../../hooks/UseBadges";
import { QuizEditValues } from "../../types/quiz-edit-values";
import { NullInt } from "../../types/null-int";
import { useSession } from "next-auth/react";
import { CreateSvgMapPayload } from "../../types/create-svg-map-payload";
import { quizToast } from "../../helpers/toasts";
import axiosClient from "../../axios";

export interface Props {
  svgMap?: SVGBase;
  isOpen?: boolean;
  onClose?: () => void;
  setError?: (error: string) => void;
}

const AdminCreateMapModal: FC<Props> = ({
  svgMap = null,
  isOpen = false,
  onClose = () => {},
  setError = () => {},
}) => {
  const { data: session } = useSession();
  const toast = useToast();

  const [index, setIndex] = useState(0);
  const [mappings, setMappings] = useState<CreateMappingsSubmit>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: types } = useQuizTypes();
  const { data: continents } = useContinents();
  const { data: badges } = useBadges();

  useEffect(() => {
    if (svgMap) {
      setMappings({
        groupName: "",
        entries: svgMap.elements.map((x) => {
          return {
            name: x.name,
            code: x.id,
          };
        }),
      });
    }
  }, [svgMap]);

  const handleMappingsBack = (values: CreateMappingsSubmit): void => {
    setMappings(values);
    updateMap(values.entries);
    setIndex(index - 1);
  };

  const handleMappingsSubmit = (values: CreateMappingsSubmit): void => {
    setMappings(values);
    setIndex(index + 1);
  };

  const updateMap = (mappings: CreateMappingEntry[]): void => {
    for (let i = 0; i < svgMap.elements.length; i++) {
      svgMap.elements[i].name = mappings[i].name;
      svgMap.elements[i].id = mappings[i].code;
    }
  };

  const handleQuizSubmit = (values: QuizFormSubmit): void => {
    setIsSubmitting(true);
    updateMap(mappings.entries);

    const badgeId: NullInt = {
      Int64: values.badgeId ? parseInt(values.badgeId) : 0,
      Valid: !!values.badgeId,
    };

    const continentId: NullInt = {
      Int64: values.continentId ? parseInt(values.continentId) : 0,
      Valid: !!values.continentId,
    };

    const payload: CreateSvgMapPayload = {
      svgMap: {
        ...svgMap,
        key: values.apiPath,
        className: values.mapSVG,
        label: values.name,
      },
      mappings: {
        key: values.apiPath,
        label: mappings.groupName,
        entries: mappings.entries,
      },
      quiz: {
        typeId: parseInt(values.typeId),
        badgeId: badgeId,
        continentId: continentId,
        country: values.country,
        singular: values.singular,
        name: values.name,
        maxScore: parseInt(values.maxScore),
        time: parseInt(values.time),
        mapSVG: values.mapSVG,
        imageUrl: values.imageUrl,
        plural: values.plural,
        apiPath: values.apiPath,
        route: values.route,
        hasLeaderboard: values.hasLeaderboard === "true",
        hasGrouping: values.hasGrouping === "true",
        hasFlags: values.hasFlags === "true",
        enabled: values.enabled === "true",
      },
    };

    axiosClient
      .post(`/maps`, payload, session?.authConfig)
      .then(() => toast(quizToast()))
      .catch((error) => setError(error.response.data))
      .finally(() => {
        setIsSubmitting(false);
        onClose();
      });
  };

  const header = (
    <Flex direction="column" padding={6}>
      <Heading fontSize={26} marginLeft={0.5} mb={3}>
        {index === 0
          ? "Preview Map"
          : index === 1
          ? "Update Mappings"
          : "Create Quiz"}
      </Heading>
      <Divider borderWidth={1} />
    </Flex>
  );

  const getContent = () => {
    switch (index) {
      case 1: {
        return (
          <AdminCreateMapMappingsForm
            values={mappings}
            onSubmit={handleMappingsSubmit}
            onPreviousPage={handleMappingsBack}
          />
        );
      }
      case 2: {
        const values: QuizEditValues = {
          id: 0,
          typeId: "1",
          badgeId: "",
          continentId: "",
          country: "",
          singular: "",
          name: "",
          maxScore: mappings.entries.length.toString(),
          time: "0",
          mapSVG: "",
          imageUrl: "",
          plural: "",
          apiPath: "",
          route: "",
          hasLeaderboard: "false",
          hasGrouping: "false",
          hasFlags: "false",
          enabled: "false",
        };

        return (
          <AdminQuizForm
            editValues={values}
            onSubmit={handleQuizSubmit}
            onClose={() => setIndex(index - 1)}
            isSubmitting={isSubmitting}
            badges={badges}
            types={types}
            continents={continents}
            closeButtonText={"Back"}
            submitButtonText={"Create"}
            hideTitle
          />
        );
      }
      default:
        return (
          <AdminCreateMapPreview
            svgMap={svgMap}
            onNextPage={() => setIndex(index + 1)}
            onClose={onClose}
          />
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxHeight={{ base: "100%", md: "700px" }}
      minWidth="660px"
      header={header}
    >
      <Flex direction="column" paddingX={12} paddingBottom={12} paddingTop={3}>
        {getContent()}
      </Flex>
    </Modal>
  );
};

export default AdminCreateMapModal;
