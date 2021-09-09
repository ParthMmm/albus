import { extendTheme } from "@chakra-ui/react";
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};
const theme = extendTheme({
  config,
  components: {
    Divider: {
      colorScheme: "red",
      size: " 20px",
      variants: { main: { colorScheme: "red", size: "500px" } },
    },
  },
});
export default theme;
