import {
  Box,
  Center,
  Heading,
  Flex,
  Text,
  Image,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAlbum } from "../providers/albumProvider";
import { useRouter } from "next/router";
import { albumInfoFetch } from "../utils/fetch";
import useSWR from "swr";
import { MdStar } from "react-icons/md";
import { Suspense } from "react";
import fetcher from "../utils/fetcher";

function AlbumInfo() {
  const [mounted, setMounted] = useState(false);
  const [mbid, setMBID] = useState("");
  const router = useRouter();
  const album = useAlbum();
  console.log(router.query.slug);

  const artist = router.query.slug[0];
  const albumName = router.query.slug[1];

  // album.getID(albumName, artist);
  // mbid = album.albumID;
  console.log(album.albumID);

  // useEffect(() => {
  //   async function fetch() {
  //     await album.getID(albumName, artist);
  //     setMBID(album.albumID);
  //     setMounted(true);
  //   }
  //   fetch();
  // }, []);

  useEffect(() => {
    album.getID(albumName, artist);
    setMBID(album.albumID);
    setMounted(true);
  });

  const { data, error, isValidating } = useSWR(
    mounted ? `${albumInfoFetch}&mbid=${mbid}` : null,

    {
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      dedupingInterval: 1000000,
    }
  );

  let currentAlbum = {};
  if (error || isValidating) {
    console.log("Poop");
  } else if (mounted && data) {
    console.log(data);
    // currentAlbum = {
    //   artist: data.album.artist,
    //   name: data.album.name,
    //   wiki: data.album.wiki.summary,
    //   tags: data.album.tags,
    //   image: data.album.image[4]["#text"],
    //   url: data.album.url,
    // };
  }
  // console.log(mbid);

  return (
    <Box bg="gray.600" w="80%" h="30rem" mx="auto" mt={10} color="white">
      <Box p="5" maxW="320px" borderWidth="1px">
        <Image borderRadius="md" src={currentAlbum.image} />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">Plus</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            Verified &bull; Cape Town
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          Modern, Chic Penthouse with Mountain, City & Sea Views
        </Text>
        <Text mt={2}>$119/night</Text>
        <Flex mt={2} align="center">
          <Box as={MdStar} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>4.84</b> (190)
          </Text>
        </Flex>
      </Box>
    </Box>
  );
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
