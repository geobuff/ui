import React, { FC } from "react";
import { Divider, Flex, Heading, Input } from "@chakra-ui/react";
import Card from "../Card";

export interface Props {
  onUpload?: (event: any) => void;
}

const AdminCreateMap: FC<Props> = ({ onUpload = (): void => {} }) => {
  return (
    <Card marginTop={6}>
      <Flex marginBottom={5} marginX={2} paddingTop={2}>
        <Heading fontSize="24px">{"Create SVG Map"}</Heading>
      </Flex>
      <Divider borderWidth={1} marginBottom={6} />
      <Flex justifyContent="center" py={6}>
        <Input
          type="file"
          name="file"
          accept=".svg"
          onChange={onUpload}
          maxWidth={400}
        />
      </Flex>
    </Card>
  );
};

export default AdminCreateMap;
