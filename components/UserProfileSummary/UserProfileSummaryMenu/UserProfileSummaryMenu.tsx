import React, { FC } from "react";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";

import SaveAlt from "../../../Icons/SaveAlt";
import SolidDotsVertical from "../../../Icons/SolidDotsVertical";
import SolidPencil from "../../../Icons/SolidPencil";
import User from "../../../Icons/User";

const downloadDataExplainer =
  "Downloads all personal information collected by GeoBuff.";

export interface Props {
  downloadData?: string[][];
  onUserModalOpen: () => void;
  onAvatarModalOpen: () => void;
}

const UserProfileSummaryMenu: FC<Props> = ({
  onUserModalOpen = () => {},
  onAvatarModalOpen = () => {},
  downloadData = [],
}) => {
  return (
    <Menu>
      <MenuButton as={IconButton} backgroundColor="inherit">
        <SolidDotsVertical color="gray.600" height={6} width={6} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={onUserModalOpen}>
          <Flex alignItems="center">
            <SolidPencil
              color="gray.600"
              marginTop={0.5}
              marginRight={1.5}
              height={4}
              width={4}
            />
            {"Edit Profile"}
          </Flex>
        </MenuItem>
        <MenuItem onClick={onAvatarModalOpen}>
          <Flex alignItems="center">
            <User
              fill="gray.600"
              color="gray.600"
              marginTop={0.5}
              marginRight={1.5}
              height={4}
              width={4}
            />
            {"Edit Avatar"}
          </Flex>
        </MenuItem>

        {!!downloadData.length && (
          <MenuItem>
            <Flex alignItems="center" maxWidth="200px">
              <CSVLink data={downloadData} filename={"data.csv"}>
                <SaveAlt
                  color="gray.600"
                  fontWeight="bold"
                  marginRight={1.5}
                  height={4}
                  width={4}
                />
                {"Download Data"}
                <Text fontSize="xs" marginTop={2} color="gray.500">
                  {downloadDataExplainer}
                </Text>
              </CSVLink>
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserProfileSummaryMenu;
