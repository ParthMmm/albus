import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  Box,
  Heading,
  Center,
  Text,
  Grid,
  GridItem,
  Skeleton,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Album from "../components/Album/Album";
import { tagTopAlbumsFetch } from "../utils/fetch";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useAuth } from "../providers/authProvider";
import TrendingArtists from "../components/Artist/TrendingArtists";
import TrendingTracks from "../components/Tracks/TrendingTracks";
import TopAlbums from "../components/Album/TopAlbums";

function home() {
  const auth = useAuth();

  let albums = [];
  const emojis = ["👋", "🌊", "🔊", "💿", "🎸", "🥁", "🎶", "🎺", "🎻", "🎤"];
  let randomNum = Math.floor(Math.random() * 9);

  return (
    <>
      <Header />
      <Box
        bg="gray.600"
        w="80%"
        h="30rem"
        mx="auto"
        mt={10}
        color="white"
        rounded="lg"
        shadow="md"
      >
        <Center mb={8} h="20vh" w="40vh" p={5}>
          {" "}
          {auth.user?.username ? (
            <Heading>
              hi, {auth.user.username}! {emojis[randomNum]}
            </Heading>
          ) : (
            <Heading>welcome to albus! {emojis[randomNum]} </Heading>
          )}
        </Center>
      </Box>

      <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
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
        <Box mt={10}>
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

export default home;
