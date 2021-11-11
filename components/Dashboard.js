import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Center,
  Text,
  Grid,
  Skeleton,
  useColorMode,
} from "@chakra-ui/react";
import { colors, emojis } from "../utils/randoms";

import { useAuth } from "../providers/authProvider";
import Album from "./Album/Album";

function Dashboard() {
  const auth = useAuth();
  let randomNum = Math.floor(Math.random() * emojis.length);
  let randomColor = Math.floor(Math.random() * colors.length);
  const [listening, setListening] = useState(null);

  const fetchActions = () => {
    if (auth.user?.actions?.listening) {
      let res = auth.user.actions.listening;
      if (res.length > 0) {
        setListening(res.reverse());
      }
      console.log(res);
    }
  };

  useEffect(() => {
    if (auth.user) {
      console.log("ding");
      auth.fetchUser();
      fetchActions();
    }
  }, [auth.user]);

  if (auth.loading) {
    return (
      <>
        <Box w="80%" mx="auto" mt={10} d="flex">
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
      </>
    );
  }

  if (auth.user && !auth.loading && !listening) {
    return (
      <Box
        w="80%"
        mx="auto"
        d="flex"
        flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
        flexGrow="1"
        justifyContent={{
          base: "center",
          sm: "center",
          md: "center",
          lg: "space-between",
        }}
        alignItems="center"
        mt={10}
      >
        <Center mb={8} h="20vh" w="40vh" p={5}>
          {" "}
          {auth.user?.username ? (
            <>
              <Heading color={colors[randomColor]} pr={2}>
                hi, {auth.user.username}!{"  "}
              </Heading>
              {"  "}
              <Heading as="span"> {emojis[randomNum]}</Heading>
            </>
          ) : (
            <Heading>welcome to albus! {emojis[randomNum]} </Heading>
          )}
        </Center>
        <Box>
          {listening?.length >= 2 ? (
            <>
              <Heading mb={2}>🎧 currently listening</Heading>

              <Grid
                gridTemplateColumns={[
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                ]}
                gap={3}
              >
                {listening.slice(0, 2).map((x) => (
                  <Album key={x._id} thing={x} />
                ))}
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  }
  if (auth.user && !auth.loading && listening) {
    return (
      <Box
        w="80%"
        mx="auto"
        d="flex"
        flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
        flexGrow="1"
        justifyContent={{
          base: "center",
          sm: "center",
          md: "center",
          lg: "space-between",
        }}
        alignItems="center"
        mt={10}
      >
        <Center mb={8} h="20vh" w="40vh" p={5}>
          {" "}
          {auth.user?.username ? (
            <>
              <Heading color={colors[randomColor]} pr={2}>
                hi, {auth.user.username}!{"  "}
              </Heading>
              {"  "}
              <Heading as="span"> {emojis[randomNum]}</Heading>
            </>
          ) : (
            <Heading>welcome to albus! {emojis[randomNum]} </Heading>
          )}
        </Center>
        <Box>
          {listening?.length >= 2 ? (
            <>
              <Heading mb={2}>🎧 currently listening</Heading>

              <Grid
                gridTemplateColumns={[
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                ]}
                gap={3}
              >
                {listening.slice(0, 2).map((x) => (
                  <Album key={x._id} thing={x} />
                ))}
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        w="80%"
        mx="auto"
        d="flex"
        flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
        flexGrow="1"
        justifyContent="center"
        alignItems="center"
        mt={10}
      >
        <Center mb={8} h="20vh" w="40vh" p={5}>
          <Heading>welcome to albus! {emojis[randomNum]} </Heading>
        </Center>
      </Box>
    );
  }
}

export default Dashboard;
