import React, { FC, useContext, useState } from "react";

import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { AppContext } from "../contexts/AppContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { LanguageContext } from "../contexts/LanguageContext";

import axiosClient from "../axios";
import { GameOverRedirect } from "../types/game-over-redirect";
import { LoginFormSubmit } from "../types/login-form-submit";
import { LoginFormContainer } from "./LoginFormContainer";

export const LoginContainer: FC = () => {
  const router = useRouter();
  const { updateUser } = useContext(CurrentUserContext);
  const { t } = useContext(LanguageContext);
  const { setError } = useContext(AppContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: LoginFormSubmit): Promise<void> => {
    setIsSubmitting(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });

    if (response?.error) {
      setError(response.error);
      setIsSubmitting(false);
      return;
    }

    axiosClient
      .get(`/users/email/${values.email}`)
      .then((response) => {
        updateUser(response.data);
        if (router.query.data) {
          const data: GameOverRedirect = JSON.parse(
            router.query.data as string
          );

          router.push({
            pathname: data.redirect,
            query: {
              data: JSON.stringify({
                tempScoreId: data.tempScoreId,
              }),
            },
          });
        } else {
          router.push("/");
        }
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <Head>
        <title>{`${t.global.login} - GeoBuff`}</title>
        <meta
          name="description"
          content="Login to GeoBuff to start building your geography knowledge using our variety of interactive map or flag games!"
        />
      </Head>
      <LoginFormContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  );
};
