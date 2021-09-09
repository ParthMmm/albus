import React from "react";
import Header from "../components/Header";
import { Box, Heading, Center, Text } from "@chakra-ui/react";

import { useAuth } from "../providers/authProvider";
import TrendingArtists from "../components/Artist/TrendingArtists";
import TrendingTracks from "../components/Tracks/TrendingTracks";
import TopAlbums from "../components/Album/TopAlbums";

import { colors, emojis } from "../utils/randoms";
function index() {
  const auth = useAuth();

  let albums = [];
  let randomNum = Math.floor(Math.random() * emojis.length);
  let randomColor = Math.floor(Math.random() * colors.length);

  return (
    <>
      <Header />
      <Box
        bg={{ dark: "white", light: "white" }}
        w="80%"
        h="30rem"
        mx="auto"
        mt={10}
        color={{ dark: "white", light: "black" }}
        rounded="lg"
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
      </Box>

      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <Box mb={4}>
          <Heading>top dance albums</Heading>
          <Text>all time</Text>
        </Box>
        <TopAlbums />
        <Box mt={10}>
          <Box mb={4}>
            <Heading>trending artists</Heading>
            <Text>this week</Text>
          </Box>
          <TrendingArtists />
        </Box>
        <Box mt={10} pb={10}>
          <Box mb={4}>
            <Heading>trending tracks</Heading>
            <Text>this week</Text>
          </Box>
          <TrendingTracks />
        </Box>
      </Box>
    </>
  );
}

export default index;
