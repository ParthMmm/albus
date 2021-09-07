import { ChakraProvider } from "@chakra-ui/react";
import { ActionProvider } from "../providers/actionProvider";
import { AlbumProvider } from "../providers/albumProvider";
import { AuthProvider } from "../providers/authProvider";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ActionProvider>
          <AlbumProvider>
            <Component {...pageProps} />
          </AlbumProvider>
        </ActionProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
