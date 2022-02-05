import React, { FC } from "react";
import { Alert, AlertIcon, Button, Flex, Stack } from "@chakra-ui/react";

export interface Props {
  onDevUIDeploy?: () => void;
  onProdUIDeploy?: () => void;
  onMobileProdUIDeploy?: () => void;
  onCreateTrivia: () => void;
  isSubmitting?: boolean;
  error?: string;
}

const AdminGeneral: FC<Props> = ({
  onDevUIDeploy = (): void => {},
  onProdUIDeploy = (): void => {},
  onMobileProdUIDeploy = (): void => {},
  onCreateTrivia = (): void => {},
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
      <Flex
        margin={6}
        padding={12}
        background="white"
        borderRadius={12}
        justifyContent="center"
      >
        <Stack>
          <Button onClick={onDevUIDeploy} disabled={isSubmitting}>
            Deploy Dev UI
          </Button>
          <Button onClick={onProdUIDeploy} disabled={isSubmitting}>
            Deploy Prod UI
          </Button>
          <Button onClick={onMobileProdUIDeploy} disabled={isSubmitting}>
            Deploy Mobile Prod UI
          </Button>
          <Button onClick={onCreateTrivia} disabled={isSubmitting}>
            Create Trivia
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default AdminGeneral;
