import { ChakraProvider } from "@chakra-ui/react";
import { ActionProvider } from "../providers/actionProvider";
import { AlbumProvider } from "../providers/albumProvider";
import { AuthProvider } from "../providers/authProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
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
