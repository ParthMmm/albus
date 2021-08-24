import {
  Box,
  Center,
  Heading,
  Flex,
  Text,
  Image,
  Badge,
  Skeleton,
  Tag,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAlbum } from "../providers/albumProvider";
import { useRouter } from "next/router";
import { albumInfoFetch } from "../utils/fetch";
import useSWR from "swr";
import { MdStar, MdPeople, MdPlayArrow } from "react-icons/md";
import { Suspense } from "react";
import fetcher from "../utils/fetcher";
import NumberFormat from "react-number-format";

function AlbumInfo() {
  const [mounted, setMounted] = useState(false);
  const [mbid, setMBID] = useState("");
  const router = useRouter();
  const album = useAlbum();
  // console.log(router.query.slug);

  const artist = router.query.slug[0];
  const albumName = router.query.slug[1];

  const { data, error, isValidating } = useSWR(
    `${albumInfoFetch}&album=${albumName}&artist=${artist}`,
    {
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      dedupingInterval: 1000000,
    }
  );

  let currentAlbum = {};
  let tags;
  if (!data) {
    return (
      <Box>
        <Skeleton
          startColor="orange.500"
          endColor="purple.500"
          height="25rem"
          width="100%"
        />
      </Box>
    );
  }
  if (error || isValidating) {
    console.log("Poop");
  }
  if (data) {
    console.log(data);
    currentAlbum = {
      artist: data.album.artist,
      name: data.album.name,
      wiki: data.album.wiki?.summary,
      tags: data.album.tags.tag,
      image: data.album.image[4]["#text"],
      url: data.album.url,
      listeners: data.album.listeners,
      playcount: data.album.playcount,
      tracks: data.album.tracks.track,
    };

    return (
      <div>
        <Box
          bg="gray.600"
          w="80%"
          h="30rem"
          mx="auto"
          mt={10}
          color="white"
          d="flex"
        >
          <Box p="5" maxW="320px" borderWidth="1px">
            <Image borderRadius="md" src={currentAlbum.image} />
            <Flex align="baseline" mt={2}>
              {currentAlbum.tags.map((tag) => {
                return (
                  <Tag
                    ml={2}
                    textTransform="uppercase"
                    fontSize="sm"
                    fontWeight="bold"
                    color="purple.800"
                  >
                    {tag.name}
                  </Tag>
                );
              })}
            </Flex>
            <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
              {currentAlbum.name}
            </Text>
            <Text mt={2}>{currentAlbum.artist}</Text>
            <Flex mt={2} align="center">
              <Box as={MdPlayArrow} color="orange.400" />
              <Text ml={1} fontSize="sm">
                <b>
                  <NumberFormat
                    value={currentAlbum.playcount}
                    displayType="text"
                    thousandSeparator={true}
                  ></NumberFormat>
                </b>
              </Text>
            </Flex>
            <Flex mt={2} align="center">
              <Box as={MdPeople} color="orange.400" />
              <Text ml={1} fontSize="sm">
                <b>
                  <NumberFormat
                    value={currentAlbum.listeners}
                    displayType="text"
                    thousandSeparator={true}
                  ></NumberFormat>
                </b>
              </Text>
            </Flex>
          </Box>
          {currentAlbum.wiki ? (
            <Box>
              <Text>{currentAlbum.wiki}</Text>
            </Box>
          ) : (
            <Box></Box>
          )}
        </Box>
        <Box d="flex" alignItems="baseline">
          <Box
            d="flex"
            bg="gray.600"
            w="80%"
            h="30rem"
            mx="auto"
            mt={10}
            color="white"
          >
            <Box d="flex" flexDirection="column">
              {currentAlbum.tracks.map((track) => {
                return <Text>{track.name}</Text>;
              })}
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}

function AlbumPage() {
  return (
    <div>
      <Header />
      <AlbumInfo />
    </div>
  );
}

export default AlbumPage;
