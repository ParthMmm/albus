import React, { useEffect } from "react";
import Header from "../components/Header";
import { Box, Heading, Center, Text } from "@chakra-ui/react";

import { useAuth } from "../providers/authProvider";
import TrendingArtists from "../components/Artist/TrendingArtists";
import TrendingTracks from "../components/Tracks/TrendingTracks";
import TopAlbums from "../components/Album/TopAlbums";

import { colors, emojis } from "../utils/randoms";
import Dashboard from "../components/Dashboard";
function index() {
  const auth = useAuth();

  let albums = [];
  let randomNum = Math.floor(Math.random() * emojis.length);
  let randomColor = Math.floor(Math.random() * colors.length);

  return (
    <>
      <Header />
      <Dashboard />

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
