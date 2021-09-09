import React from "react";
import { Box, Text, Image, Link, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import { useAlbum } from "../../providers/albumProvider";
import { useRouter } from "next/router";
import useSWR from "swr";
import { albumInfoFetch, albumSearchFetch } from "../../utils/fetch";

function Album({ thing }) {
  const album = useAlbum();
  const router = useRouter();
  let properties = {};
  const { colorMode } = useColorMode();

  const colors = [
    "red.300",
    "orange.300",
    "yellow.300",
    "green.300",
    "teal.300",
    "blue.300",
    "cyan.300",
    "purple.300",
    "pink.300",
  ];
  let randomNum = Math.floor(Math.random() * colors.length);

  if (thing._id && thing.mbid) {
    const { data, error, isValidating } = useSWR(
      albumInfoFetch + `&mbid=${thing.mbid}`,
      {
        revalidateOnFocus: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
        dedupingInterval: 1000000,
      }
    );
    if (data?.error) {
      return <div></div>;
    }
    if (data) {
      properties = {
        imageUrl: data.album.image[2]["#text"],
        artist: data.album.artist,
        name: data.album.name,
        url: data.album.url,
      };
    }
  } else if (thing.albumName) {
    const { data, error, isValidating } = useSWR(
      albumInfoFetch + `&artist=${thing.artist}` + `&album=${thing.albumName}`,
      {
        revalidateOnFocus: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
        dedupingInterval: 1000000,
      }
    );

    if (data?.error) {
      return <div></div>;
    }
    if (data) {
      properties = {
        imageUrl: data.album.image[2]["#text"],
        artist: data.album.artist,
        name: data.album.name,
        url: data.album.url,
      };
    }
  } else if (thing.artist?.name) {
    properties = {
      imageUrl: thing.image[2]["#text"],
      artist: thing.artist.name,
      name: thing.name,
      url: thing.url,
    };
  } else if (thing.artist) {
    properties = {
      imageUrl: thing.image[2]["#text"],
      artist: thing.artist,
      name: thing.name,
      url: thing.url,
    };
  }

  return (
    <Box shadow="xl">
      {" "}
      <Box
        bg={colors[randomNum]}
        p={5}
        d="flex"
        alignItems="center"
        justifyContent="center"
        rounded="lg"
        roundedBottom="none"
        w={{ base: "18vh", md: "full" }}
      >
        <Image
          src={properties.imageUrl}
          alt="Album Cover"
          objectFit="contain"
        />
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        px="4"
        flexShrink="1"
        h="150"
        // bg={colorMode === "light" ? "#ECF0F1" : "#34495E"}
        border="5px solid"
        borderColor={colors[randomNum]}
        roundedBottom="lg"
        w={{ base: "18vh", md: "full" }}
      >
        <NextLink
          href={{
            pathname: `/album/[...slug]`,
            query: {
              artist: properties.artist,
              name: properties.name,
            },
          }}
          as={`/album/${properties.artist}/${encodeURIComponent(
            properties.name
          )}`}
          passHref
        >
          <Link
            fontWeight="bold"
            lineHeight="normal"
            // fontSize="xl"
            fontSize={{ base: "l", md: "xl" }}
            _hover={{ color: "tomato" }}
            color={colorMode === "light" ? "purple.600" : "purple.300"}
          >
            <Text> {properties.name}</Text>
          </Link>
        </NextLink>

        <Text fontSize="md" fontWeight="semibold">
          {properties.artist}
        </Text>
      </Box>
    </Box>
  );
}

export default Album;
