import React, { FC } from "react";
import { Flex, Heading, Input, useBreakpointValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { AuthUser } from "../../../types/auth-user";

export interface Props {
  onUpload?: (event: any) => void;
}

const AdminMapsHeader: FC<Props> = ({ onUpload = () => {} }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { data: session, status } = useSession();
  const user = session?.user as AuthUser;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom={5}
      marginX={2}
    >
      <Heading fontSize="24px">{"Maps"}</Heading>

      {!isMobile && status === "authenticated" && user.isAdmin && (
        <Input
          type="file"
          name="file"
          accept=".svg"
          onChange={onUpload}
          maxWidth={300}
          border="1px solid black"
          paddingTop={0.5}
        />
      )}
    </Flex>
  );
};

export default AdminMapsHeader;
