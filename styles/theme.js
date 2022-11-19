import { extendTheme } from "@chakra-ui/react";

import colors from "./config/colors";
import Input from "./config/input";
import Table from "./config/table";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

const mobileStyles = {
  html: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  body: {
    height: "100%",
    overflow: "auto",
    position: "relative",
  },
};

const theme = extendTheme({
  colors,
  components: {
    Input,
    Table,
  },
  styles: {
    global: {
      html: {
        ...(isAppMobile ? mobileStyles.html : {}),
      },
      body: {
        backgroundColor: "#F0F0F0",
        ...(isAppMobile ? mobileStyles.body : {}),
      },
      ".mdx-prose": {
        h1: {
          fontSize: "4xl",
          lineHeight: "1.2",
          fontWeight: 700,
          mt: 12,
          mb: 3,
        },
        h2: {
          fontSize: "3xl",
          lineHeight: "1.2",
          fontWeight: 700,
          mt: 12,
          mb: 3,
        },
        h3: {
          fontSize: "2xl",
          lineHeight: "1.2",
          fontWeight: 700,
          mt: 12,
          mb: 3,
        },
        h4: {
          fontSize: "xl",
          lineHeight: "1.2",
          fontWeight: 700,
          mt: 12,
          mb: 3,
        },
        p: {
          mb: 3,
        },
      },
    },
  },
});

export default theme;
