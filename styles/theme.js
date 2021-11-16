import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#1a202c")(props),
    },
  }),
};
const theme = extendTheme({
  config,
  styles,
  colors: {
    componentBg: "#303b51",
    lightComponentBg: "#5c719b",
  },
  components: {
    Divider: {
      colorScheme: "red",
      size: " 20px",
      variants: { main: { colorScheme: "red", size: "500px" } },
    },
  },
});
export default theme;
