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
    <div>
      <Box shadow="2xl">
        {" "}
        <Box
          flexShrink="0"
          bg={colors[randomNum]}
          p={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight={{ base: 250, md: 200 }}
          rounded="lg"
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
          // bg={{ dark: "#2C3E50", light: "#ECF0F1" }}
          // bg="#34495E"
          bg={colorMode === "light" ? "#ECF0F1" : "#34495E"}
          roundedBottom="lg"
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
              fontSize="xl"
              display="block"
              _hover={{ color: "tomato" }}
              color={"purple.300"}
            >
              <Text> {properties.name}</Text>
            </Link>
          </NextLink>

          <Text fontSize="sm" placeItems="center" fontWeight="semibold">
            {properties.artist}
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default Album;
