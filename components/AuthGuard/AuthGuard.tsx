import React from "react";
import { FC, useEffect, useState } from "react";

import { GameSpinner } from "@geobuff/buff-ui/components";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const AuthGuard: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status, router]);

  if (isLoading) {
    return <GameSpinner />;
  }

  return <>{children}</>;
};

export default AuthGuard;
