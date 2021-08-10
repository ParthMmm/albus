import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Box, Heading, Center, Text, Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import Album from "../components/Album";

function landing() {
  const [randomNum, setNum] = useState(0);
  const [albums, setAlbums] = useState([]);
  const emojis = ["👋", "🌊", "🔊", "💿", "🎸", "🥁", "🎶", "🎺", "🎻", "🎤"];
  const fetchAlbums = async () => {
    let res = await axios.get(
      "https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=electronic&api_key=9fad01c4307703006aa5ebe8aded58bc&format=json&limit=10"
    );
    setAlbums(res.data.albums.album);
  };
  console.log(albums);

  useEffect(() => {
    fetchAlbums();
    setNum(Math.floor(Math.random() * 9));
  }, [randomNum]);

  return (
    <div>
      <Header />

      <Box bg="gray.600" w="80%" h="30rem" mx="auto" mt={10} color="white">
        <Center
          mb={8}
          h="20vh"
          w="35vh"
          p={5}
          flexDirection="column"
          rounded="xl"
        >
          {" "}
          <Heading>
            welcome to albus!
            {emojis[randomNum]}{" "}
          </Heading>
          <Text></Text>
        </Center>
      </Box>
      <Box bg="gray.600" w="80%" h="50rem" mx="auto" mt={10} color="white">
        <Grid
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={1}
        >
          {albums.map((album) => (
            <GridItem>
              <Album key={album.mbid} album={album}></Album>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default landing;
