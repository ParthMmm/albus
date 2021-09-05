import React, { useEffect } from "react";
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
import { useAlbum } from "../providers/albumProvider";
import { useRouter } from "next/router";
import useSWR from "swr";
import { albumInfoFetch, albumSearchFetch } from "../utils/fetch";

function Album({ thing }) {
  const album = useAlbum();
  const router = useRouter();
  let properties = {};

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
  }
  // if (thing._id) {
  //   console.log("thi");
  else if (thing.artist) {
    console.log(thing);

    properties = {
      imageUrl: thing.image[2]["#text"],
      artist: thing.artist,
      name: thing.name,
      url: thing.url,
    };
  }

  return (
    <div>
      <Box shadow="md">
        {" "}
        <Box
          flexShrink="0"
          bg="orange.500"
          p={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight={{ base: 250, md: 200 }}
          shadow="lg"
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
          bg="gray.600"
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
// as={`/album/${properties.artist}/${properties.name}`}
