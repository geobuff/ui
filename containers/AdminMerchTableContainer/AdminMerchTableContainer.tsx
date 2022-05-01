import React, { FC } from "react";
import AdminMerchTable from "../../components/AdminMerchTable";
import { flattenToSizes } from "../../helpers/merch";
import useMerch from "../../hooks/UseMerch";

const AdminMerchTableContainer: FC = () => {
  const { merch, isLoading } = useMerch();

  return (
    <AdminMerchTable merch={flattenToSizes(merch)} isLoading={isLoading} />
  );
};

export default AdminMerchTableContainer;
