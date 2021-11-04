import React, { FC } from "react";

interface Props {
  avatarCount?: number;
}

const AvatarSelectPlaceholder: FC<Props> = ({ avatarCount = 6 }) => <>Test</>;

export default AvatarSelectPlaceholder;
