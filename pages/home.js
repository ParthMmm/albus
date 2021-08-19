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
import Album from "../components/Album";
import { tagTopAlbumsFetch } from "../utils/fetch";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

function home() {
  //   const [randomNum, setNum] = useState(0);
  //   const [albums, setAlbums] = useState([]);
  let albums = [];
  const emojis = ["👋", "🌊", "🔊", "💿", "🎸", "🥁", "🎶", "🎺", "🎻", "🎤"];
  let randomNum = Math.floor(Math.random() * 9);

  const { data, error, isValidating } = useSWR(
    tagTopAlbumsFetch + "&tag=dance",
    {
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      dedupingInterval: 1000000,
    }
  );

  if (error || isValidating) {
    console.log("Poop");
  } else {
    albums = data.albums.album;
    // setAlbums(data.albums.album);

    // albums.map((album) => {
    //   console.log(album);
    // });
  }

  //   useEffect(() => {
  //     // fetchAlbums();
  //     setNum(Math.floor(Math.random() * 9));
  //   }, [randomNum]);

  return (
    <div>
      <Header />

      <Box bg="gray.600" w="80%" h="30rem" mx="auto" mt={10} color="white">
        <Center mb={8} h="20vh" w="40vh" p={5}>
          {" "}
          <Heading>welcome to albus! {emojis[randomNum]} </Heading>
        </Center>
      </Box>

      <Box w="80%" h="50rem" mx="auto" mt={10} color="white">
        <Box mb={4}>
          <Heading>Top Dance Albums</Heading>
          <Text>All Time</Text>
        </Box>
        {error || isValidating ? (
          <Center>
            <SimpleGrid columns="1" row="2" gap={1}>
              <Box>
                <Skeleton
                  startColor="purple.500"
                  endColor="orange.500"
                  height="25rem"
                  width="100%"
                />
              </Box>
              <Box>
                <Skeleton
                  startColor="orange.500"
                  endColor="purple.500"
                  height="25rem"
                  width="100%"
                />
              </Box>
            </SimpleGrid>
          </Center>
        ) : (
          <Grid
            gridTemplateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(5, 1fr)",
            ]}
            gap={3}
          >
            {albums.map((album) => (
              <Album key={album.mbid} thing={album} />
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default home;
