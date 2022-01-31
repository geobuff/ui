import { extendTheme } from "@chakra-ui/react";
import Input from "./config/input";
import Table from "./config/table";

import colors from "./config/colors";

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
    },
  },
});

export default theme;
