import React, { FC, useContext } from "react";
import { Heading, Flex, Button, useBreakpointValue } from "@chakra-ui/react";
import { AuthUser } from "../../../types/auth-user";
import { useSession } from "next-auth/react";
import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

interface Props {
  onCreateFlagsClick?: () => void;
}

const AdminFlagsHeader: FC<Props> = ({
  onCreateFlagsClick = (): void => {},
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t } = useContext(LanguageContext);

  const { data: session, status } = useSession();
  const user = session?.user as AuthUser;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom={5}
      marginX={2}
    >
      <Heading fontSize="24px">{t.global.flags}</Heading>

      {!isMobile && status === "authenticated" && user.isAdmin && (
        <Button colorScheme="teal" size="md" onClick={onCreateFlagsClick}>
          {"Create Flags"}
        </Button>
      )}
    </Flex>
  );
};

export default AdminFlagsHeader;
