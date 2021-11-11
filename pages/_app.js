import { ChakraProvider } from "@chakra-ui/react";
import { ActionProvider } from "../providers/actionProvider";
import { AlbumProvider } from "../providers/albumProvider";
import { AuthProvider } from "../providers/authProvider";
import { ProfileProvider } from "../providers/profileProvider";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ProfileProvider>
          <ActionProvider>
            <AlbumProvider>
              <Component {...pageProps} />
            </AlbumProvider>
          </ActionProvider>
        </ProfileProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
