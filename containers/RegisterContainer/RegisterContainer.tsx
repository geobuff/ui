import React, { FC, useContext, useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { AppContext } from "../../context/AppContext";
import { CurrentUserContext } from "../../context/CurrentUserContext/CurrentUserContext";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import RegisterForm from "../../components/RegisterForm";

import axiosClient from "../../axios/axiosClient";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { RegisterFormSubmit } from "../../types/register-form-submit";

const RegisterContainer: FC = () => {
  const router = useRouter();
  const { status } = useSession();
  const { updateUser } = useContext(CurrentUserContext);
  const { t } = useContext(LanguageContext);
  const { setError } = useContext(AppContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!router.query.data && status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSubmit = (values: RegisterFormSubmit): void => {
    setIsSubmitting(true);
    const payload = {
      avatarId: parseInt(values.avatarId),
      username: values.username,
      email: values.email,
      countryCode: values.countryCode,
      password: values.password.replace(/\s/g, ""),
    };

    axiosClient
      .post("/auth/register", payload)
      .then(async (response) => {
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl: `${window.location.origin}`,
        });

        if (signInResponse?.error) {
          setError(signInResponse.error);
          setIsSubmitting(false);
          return;
        }

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
        <title>{`${t.global.register} - GeoBuff`}</title>
        <meta
          name="description"
          content="Sign up today to start using the world's leading competitive platform for geography-based trivia!"
        />
      </Head>
      <RegisterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  );
};

export default RegisterContainer;
