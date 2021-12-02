import { ChakraProvider } from "@chakra-ui/react";
import { ActionProvider } from "../providers/actionProvider";
import { AlbumProvider } from "../providers/albumProvider";
import { AuthProvider } from "../providers/authProvider";
import { ProfileProvider } from "../providers/profileProvider";
import theme from "../styles/theme";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/router";
import { Button, Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// import { ErrorFallback } from "../components/ErrorFallback";
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box
      d="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <h2>sorry! something went wrong 🙁</h2>
      <Button onClick={resetErrorBoundary}>go home</Button>
    </Box>
  );
}
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <AuthProvider>
          <ProfileProvider>
            <ActionProvider>
              <AlbumProvider>
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => {
                    router.push("/");
                  }}
                >
                  <Component {...pageProps} />
                </ErrorBoundary>
              </AlbumProvider>
            </ActionProvider>
          </ProfileProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
