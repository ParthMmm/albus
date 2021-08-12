import React from "react";
import {
  Box,
  Heading,
  Center,
  Text,
  Image,
  Flex,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

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
      {/* <Box
        w="232px"
        h="344px"
        bg="orange.600"
        rounded="2xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink="0"
        minHeight={{ base: 250, md: 200 }}
      >
        {" "}
        <Image
          pt={14}
          src={properties.imageUrl}
          alt="Album Cover"
          objectFit="cover"
        ></Image>
        <Box>
          <Heading fontSize={24} color="black" textAlign={["center"]}>
            {properties.name}
          </Heading>
          <Text fontSize={18}>{properties.artist}</Text>
        </Box>
      </Box> */}

      <Box rounded="md" bg="white">
        {" "}
        <Box
          flexShrink="0"
          bg="orange.500"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight={{ base: 250, md: 200 }}
          // shadow="sm"
          rounded="md"
          roundedBottom="none"
        >
          <Image
            src={properties.imageUrl}
            alt="Album Cover"
            objectFit="contain"
            w={{ md: 40 }}
            h={{ md: 175 }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          p={4}
          minWidth="0px"
          minHeight={{ sm: "100px", md: "120" }}
          bg="gray.600"
        >
          <NextLink href={`${properties.url}`} passHref>
            <Link
              fontWeight="bold"
              lineHeight="normal"
              fontSize="xl"
              display="block"
              color="purple.300"
            >
              {properties.name}
            </Link>
          </NextLink>

          <Text fontSize="sm" color="white" placeItems="center">
            {properties.artist}
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default Album;
