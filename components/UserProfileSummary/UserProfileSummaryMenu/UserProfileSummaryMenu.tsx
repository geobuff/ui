import React, { FC, useContext } from "react";

import {
  DeleteBinLine,
  SaveAlt,
  SolidDotsVertical,
  SolidPencil,
  User,
} from "@geobuff/buff-ui/components";

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

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

export interface Props {
  downloadData?: string[][];
  onUserModalOpen: () => void;
  onAvatarModalOpen: () => void;
  onDeleteAccountModalOpen: () => void;
}

const UserProfileSummaryMenu: FC<Props> = ({
  downloadData = [],
  onUserModalOpen = () => {},
  onAvatarModalOpen = () => {},
  onDeleteAccountModalOpen = () => {},
}) => {
  const { t } = useContext(LanguageContext);

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
            {t.userProfileSummaryMenu.editProfile}
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
            {t.userProfileSummaryMenu.editAvatar}
          </Flex>
        </MenuItem>

        {!!downloadData.length && (
          <MenuItem>
            <Flex alignItems="center" maxWidth="200px">
              <CSVLink data={downloadData} filename={`${t.global.data}.csv`}>
                <SaveAlt
                  color="gray.600"
                  fontWeight="bold"
                  marginRight={1.5}
                  height={4}
                  width={4}
                />
                {t.userProfileSummaryMenu.downloadData}
                <Text fontSize="xs" marginTop={2} color="gray.500">
                  {t.userProfileSummaryMenu.downloadDataExplainer}
                </Text>
              </CSVLink>
            </Flex>
          </MenuItem>
        )}

        <MenuItem onClick={onDeleteAccountModalOpen}>
          <Flex alignItems="center" color="red.600">
            <DeleteBinLine
              marginTop={0.5}
              marginRight={1.5}
              height={4}
              width={4}
            />
            {t.userProfileSummaryMenu.deleteAccount}
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfileSummaryMenu;
