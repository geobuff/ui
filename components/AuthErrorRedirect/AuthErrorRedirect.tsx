import { FC, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  children?: JSX.Element;
}

export const AuthErrorRedirect: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      // Force sign out to hopefully resolve error.
      // See https://next-auth.js.org/tutorials/refresh-token-rotation#client-side.
      console.error(session?.errorMessage, "authError");
      signOut();
    }
  }, [session, router.asPath]);

  return children;
};
