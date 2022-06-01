import React, { FC } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Card from "../Card";
import { BackgroundTaskKey } from "../../types/background-task";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const {
  DeployDevWeb,
  DeployProdAll,
  DeployProdMobile,
  DeployProdWeb,
} = BackgroundTaskKey;

const deploymentControls = [
  {
    key: DeployProdAll,
    title: "Deploy All Prod UI",
    subtitle: "Redeploys both mobile-geobuff.vercel.app and geobuff.com",
    buttonText: "Deploy",
  },
  {
    key: DeployProdWeb,
    title: "Deploy Prod UI",
    subtitle: "Redeploys geobuff.com",
    buttonText: "Deploy",
  },
  {
    key: DeployProdMobile,
    title: "Deploy Mobile UI",
    subtitle: "Redeploys mobile-geobuff.vercel.app",
    buttonText: "Deploy",
  },
  {
    key: DeployDevWeb,
    title: "Deploy Dev UI",
    subtitle: "Redeploys dev.geobuff.com",
    buttonText: "Deploy",
  },
];

export interface Props {
  onDeploy: (key: BackgroundTaskKey) => void;
  onCreateTrivia: () => void;
  onRegenerateTrivia: () => void;
  onClearOldTrivia: () => void;
  regenerateDate?: string;
  setRegenerateDate?: (date: string) => void;
  isSubmitting?: boolean;
  error?: string;
  newTriviaCount: number;
}

const AdminGeneral: FC<Props> = ({
  onDeploy = () => {},
  onCreateTrivia = () => {},
  onRegenerateTrivia = (): void => {},
  onClearOldTrivia = (): void => {},
  regenerateDate = "",
  setRegenerateDate = (): void => {},
  isSubmitting = false,
  error = "",
  newTriviaCount,
}) => {
  return (
    <>
      {error && (
        <Alert status="error" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Card marginY={10} padding={6}>
        <Heading size="lg" marginBottom={5}>
          {"General"}
        </Heading>

        <Flex direction="column">
          {deploymentControls.map((control) => (
            <React.Fragment key={control.key}>
              <Divider borderWidth={1} my={2} />
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginY={2}
                marginX={1}
              >
                <Flex direction="column">
                  <Text fontSize={18} fontWeight="bold">
                    {control.title}
                  </Text>
                  <Text color="gray.500">{control.subtitle}</Text>
                </Flex>
                <Button
                  onClick={() => onDeploy(control.key)}
                  disabled={isSubmitting}
                  colorScheme="teal"
                  width="100px"
                >
                  {control.buttonText}
                </Button>
              </Flex>
            </React.Fragment>
          ))}
          <Divider borderWidth={1} my={2} />
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginY={2}
            marginX={1}
          >
            <Flex direction="column">
              <Text fontSize={18} fontWeight="bold">
                {"Create Trivia"}
              </Text>
              <Text color="gray.500">
                {"Generates the daily trivia for tomorrow"}
              </Text>
            </Flex>
            <Button
              onClick={() => onCreateTrivia()}
              disabled={isSubmitting}
              colorScheme="teal"
              width="100px"
            >
              {"Generate"}
            </Button>
          </Flex>
          <Divider borderWidth={1} my={2} />
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginY={2}
            marginX={1}
          >
            <Flex direction="column">
              <Text fontSize={18} fontWeight="bold">
                {"Regenerate Trivia"}
              </Text>
              <Text color="gray.500">
                {"Regenerates the daily trivia for a given day"}
              </Text>
            </Flex>
            <Flex>
              <DatePicker
                placeholderText="Select date..."
                selected={(regenerateDate && new Date(regenerateDate)) || null}
                onChange={(value) => {
                  setRegenerateDate(value.toISOString());
                }}
                disabled={isSubmitting}
              />
              <Button
                onClick={() => onRegenerateTrivia()}
                disabled={isSubmitting || !regenerateDate}
                colorScheme="teal"
                ml={6}
              >
                {"Regenerate"}
              </Button>
            </Flex>
          </Flex>
          <Divider borderWidth={1} my={2} />
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginY={2}
            marginX={1}
          >
            <Flex direction="column">
              <Text fontSize={18} fontWeight="bold">
                {"Clear Old Trivia"}
              </Text>
              <Text color="gray.500">
                {`Deletes all trivia older than ${newTriviaCount} days old`}
              </Text>
            </Flex>
            <Button
              onClick={() => onClearOldTrivia()}
              disabled={isSubmitting}
              colorScheme="teal"
              width="100px"
            >
              {"Clear"}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default AdminGeneral;
