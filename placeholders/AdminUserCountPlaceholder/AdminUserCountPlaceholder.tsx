import React, { FC } from "react";
import { Skeleton } from "@chakra-ui/react";

const AdminUserCountPlaceholder: FC = () => (
  <Skeleton height="400px" margin={6} borderRadius={12} />
);

export default AdminUserCountPlaceholder;
