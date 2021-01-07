import { extendTheme } from "@chakra-ui/core";
import Input from "./config/input";
import colors from "./config/colors";

const theme = extendTheme({
  colors,
  components: {
    Input,
  },
});

export default theme;
