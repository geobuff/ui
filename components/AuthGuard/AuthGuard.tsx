import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import GameSpinner from "../GameSpinner";

const AuthGuard: FC = ({ children }) => {
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
