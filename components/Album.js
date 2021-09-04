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
    console.log(data);
    // if (data) {
    //   properties = {
    //     imageUrl: data.album.image[2]["#text"],
    //     artist: data.album.artist,
    //     name: data.album.name,
    //     url: data.album.url,
    //   };
    // }
  } else if (thing.artist?.name) {
    console.log(thing);

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

  let mbid;
  // useEffect(() => {
  //   album.getID(properties.name, properties.artist);
  //   mbid = album.albumID;
  // });

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
