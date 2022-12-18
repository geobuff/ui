import React, { FC, useContext } from "react";

import { Flex, Select } from "@chakra-ui/react";

import { LanguageContext } from "../../../contexts/LanguageContext";

import { FlagGroup } from "../../../types/flag-group";

interface Props {
  group?: string;
  groups?: FlagGroup[];
  isLoading?: boolean;
  setGroup?: React.Dispatch<React.SetStateAction<string>>;
}

const AdminFlagsFilters: FC<Props> = ({
  group = "",
  groups = [],
  isLoading = false,
  setGroup = () => {},
}) => {
  const { t } = useContext(LanguageContext);

  return (
    <Flex
      marginBottom={{ base: 3, md: 1 }}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Select
        maxWidth={{ base: "100%", sm: "100%", md: "300px" }}
        onChange={(e) => setGroup(e.target.value)}
        value={group}
        boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
        height="42px"
        borderRadius={6}
        background="#F6F6F6"
        _hover={{ background: "#e0e0e0" }}
        fontWeight="bold"
        marginRight={{ base: 0, sm: 0, md: 3 }}
        noOfLines={1}
        isDisabled={isLoading}
      >
        <option value="">
          {isLoading ? t.global.loadingGroups : t.global.selectGroup}
        </option>
        {groups.map((group) => (
          <option key={group.key} value={group.key}>
            {group.label}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default AdminFlagsFilters;
