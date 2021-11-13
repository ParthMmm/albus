import React from "react";
import { Box, Text, Link, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import { useAlbum } from "../../providers/albumProvider";
import { useRouter } from "next/router";
import useSWR from "swr";
import { albumInfoFetch, albumSearchFetch } from "../../utils/fetch";
import { colors } from "../../utils/randoms";
import Image from "next/image";

function Album({ thing }) {
  const album = useAlbum();
  const router = useRouter();
  let properties = {};
  const { colorMode } = useColorMode();

  const searchSubmit = () => {
    router.push({
      pathname: "/search",
      query: { input: properties.artist },
    });
  };

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
      return null;
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
      return null;
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

  if (properties.imageUrl === undefined) {
    return null;
  }
  return (
    <Box rounded="xl" shadow="md" w={{ base: "18vh", md: "full" }}>
      {" "}
      <Box
        bg={colors[randomNum]}
        p={5}
        d="flex"
        alignItems="center"
        justifyContent="center"
        rounded="xl"
        roundedBottom="none"
        w={{ base: "18vh", md: "full" }}
      >
        <Image
          src={properties.imageUrl}
          alt="Album Cover"
          width={250}
          height={250}
          quality="100"
          layout="intrinsic"
          // fallbackSrc="https://via.placeholder.com/174"
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
        border="8px solid"
        borderColor={colors[randomNum]}
        roundedBottom="xl"
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
            <Text noOfLines={[2, 2, 2, 2, 3]}> {properties.name}</Text>
          </Link>
        </NextLink>

        <Text
          fontSize="md"
          fontWeight="semibold"
          _hover={{ color: "tomato" }}
          textDecoration="purple"
        >
          <Link onClick={() => searchSubmit()} noOfLines={[2, 2, 2, 2, 3]}>
            {" "}
            {properties.artist}
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Album;
