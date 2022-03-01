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

const {
  DeployDevWeb,
  DeployProdAll,
  DeployProdMobile,
  DeployProdWeb,
  TriviaCreate,
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
  {
    key: TriviaCreate,
    title: "Create Trivia",
    subtitle: "Generates the daily trivia for tomorrow",
    buttonText: "Generate",
  },
];

export interface Props {
  onDeploy: (key: BackgroundTaskKey) => void;
  isSubmitting?: boolean;
  error?: string;
}

const AdminGeneral: FC<Props> = ({
  onDeploy = () => {},
  isSubmitting = false,
  error = "",
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

        {deploymentControls.map((control) => (
          <Flex key={control.key} direction="column">
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
          </Flex>
        ))}
      </Card>
    </>
  );
};

export default AdminGeneral;
