import React, { FC } from "react";

import Image from "next/image";

const AdminFlag: FC = () => (
  <Image
    src={process.env.NEXT_PUBLIC_ADMIN_FLAG_URL}
    alt="GeoBuff flag"
    width={25}
    height={17}
    style={{ borderRadius: 2 }}
    priority
  />
);

export default AdminFlag;
