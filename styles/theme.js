import { extendTheme } from "@chakra-ui/react";
import Input from "./config/input";
import colors from "./config/colors";

const theme = extendTheme({
  colors,
  components: {
    Input,
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
