import React from "react";

import { DateTime } from "luxon";

const Today = () => <></>;

export default Today;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/daily-trivia/${DateTime.now().toFormat("yyyy-MM-dd")}`,
      permanent: false,
    },
  };
}
