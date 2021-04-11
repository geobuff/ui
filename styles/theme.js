import { extendTheme } from "@chakra-ui/react";
import Input from "./config/input";
import Table from "./config/table";

import colors from "./config/colors";

const theme = extendTheme({
  colors,
  components: {
    Input,
    Table,
  },
  styles: {
    global: {
      body: {
        backgroundColor: "#F0F0F0",
      },
    },
  },
});

export default theme;
