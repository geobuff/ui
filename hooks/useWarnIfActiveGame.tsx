import { useEffect } from "react";
import Router from "next/router";

const useWarnIfActiveGame = (unsavedChanges: boolean): void => {
  const message =
    "Exiting while the game is running will mean losing your score. Are you sure you want to leave?";

  useEffect(() => {
    const routeChangeStart = (url: string): void => {
      if (Router.asPath !== url && unsavedChanges && !confirm(message)) {
        Router.events.emit("routeChangeError");
        Router.replace(Router, Router.asPath);
        throw "Abort route change. Please ignore this error.";
      }
    };

    const beforeUnload = (event: BeforeUnloadEvent): string => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", beforeUnload);
    Router.events.on("routeChangeStart", routeChangeStart);

    return (): void => {
      window.removeEventListener("beforeunload", beforeUnload);
      Router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [unsavedChanges]);
};

export default useWarnIfActiveGame;
