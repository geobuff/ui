import React, { FC } from "react";
import { Flex, Heading, Input } from "@chakra-ui/react";

export interface Props {
  onUpload?: (event: any) => void;
}

const AdminMapsHeader: FC<Props> = ({ onUpload = () => {} }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom={5}
      marginX={2}
    >
      <Heading fontSize="24px">{"Maps"}</Heading>

      <Input
        type="file"
        name="file"
        accept=".svg"
        onChange={onUpload}
        maxWidth={300}
        border="1px solid black"
        paddingTop={0.5}
      />
    </Flex>
  );
};

export default AdminMapsHeader;
