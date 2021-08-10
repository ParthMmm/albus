import React from "react";
import { Box, Heading, Center, Text, Image } from "@chakra-ui/react";

function Album({ album }) {
  let imgurl = "#text";
  const properties = {
    imageUrl: album.image[2]["#text"],
    artist: album.artist.name,
    name: album.name,
    url: album.url,
  };

  //   const { `${imgurl}` } = properties.imageUrl;
  //   console.log(text);
  console.log(properties.imageUrl);
  return (
    <div>
      <Box>
        <Image src={properties.imageUrl} alt="Album Cover"></Image>
        <Box>
          <Heading>{properties.name}</Heading>
          <Text>{properties.artist}</Text>
        </Box>
      </Box>
    </div>
  );
}

export default Album;
