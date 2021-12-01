import React, { useEffect } from "react";
import Header from "../components/Header";
import { Box, Heading, Center, Text } from "@chakra-ui/react";

import { useAuth } from "../providers/authProvider";
import TrendingArtists from "../components/Artist/TrendingArtists";
import TrendingTracks from "../components/Tracks/TrendingTracks";
import TopAlbums from "../components/Album/TopAlbums";
import Head from "next/head";

import { colors, emojis } from "../utils/randoms";
import Dashboard from "../components/Dashboard";
function index() {
  const auth = useAuth();

  // auth.readCookie();

  return (
    <>
      <Head>
        <title>albus</title>
        <meta name="description" content="albus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Dashboard />

      <Box w="80%" h="50rem" mx="auto" mt={10}>
        <TopAlbums />
        <Box mt={10}>
          <TrendingArtists />
        </Box>
        <Box mt={10} pb={10}>
          <TrendingTracks />
        </Box>
      </Box>
    </>
  );
}

export default index;
