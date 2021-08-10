import React from "react";
import { Box, Heading, Center, Text, Image } from "@chakra-ui/react";

function Album({ thing }) {
  const properties = {
    imageUrl: thing.image[2]["#text"],
    artist: thing.artist.name,
    name: thing.name,
    url: thing.url,
  };

  //   const { `${imgurl}` } = properties.imageUrl;
  //   console.log(text);
  //   console.log(properties.imageUrl);
  return (
    <div>
      <Box w="17rem" h="20rem" bg="orange.600" rounded="2xl">
        <Center>
          {" "}
          <Image pt={14} src={properties.imageUrl} alt="Album Cover"></Image>
        </Center>
        <Box justifyContent="center">
          <Center>
            <Heading fontSize={24} color="black" textAlign={["center"]}>
              {properties.name}
            </Heading>
          </Center>
          <Center>
            <Text fontSize={18}>{properties.artist}</Text>
          </Center>
        </Box>
      </Box>
    </div>
  );
}

export default Album;
