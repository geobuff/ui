import React, { FC } from "react";

import useMerch from "../../hooks/UseMerch";

import AdminMerchTable from "../../components/AdminMerchTable";

import { flattenToSizes } from "../../helpers/merch";

const AdminMerchTableContainer: FC = () => {
  const { merch, isLoading } = useMerch();

  return (
    <AdminMerchTable merch={flattenToSizes(merch)} isLoading={isLoading} />
  );
};

export default AdminMerchTableContainer;
