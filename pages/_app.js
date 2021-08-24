import { ChakraProvider } from "@chakra-ui/react";
import { AlbumProvider } from "../providers/albumProvider";
import { AuthProvider } from "../providers/authProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <AlbumProvider>
          <Component {...pageProps} />
        </AlbumProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
