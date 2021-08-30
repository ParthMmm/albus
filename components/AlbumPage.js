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
  Stack,
  Link,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAlbum } from "../providers/albumProvider";
import { useAction } from "../providers/actionProvider";

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
  const action = useAction();
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

  const handleClick = () => {
    action.addListened(album.albumID);
  };

  let currentAlbum = {};
  let tags;

  useEffect(() => {
    album.getID(albumName, artist);
  }, []);

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
    console.log(album.albumID);
    currentAlbum = {
      artist: data.album.artist,
      name: data.album.name,
      wiki: data.album.wiki?.summary,
      tags: data.album.tags.tag,
      image: data.album.image[4]["#text"],
      url: data.album.url,
      listeners: data.album.listeners,
      playcount: data.album.playcount,
      tracks: data.album.tracks?.track,
    };

    return (
      <div>
        <Box
          bg="gray.600"
          w="80%"
          mx="auto"
          mt={10}
          color="white"
          d="flex"
          flexGrow="1"
          alignItems="flex-start"
          justifyContent="space-between"
          flexDir={{ sm: "column", md: "column", lg: "row" }}
        >
          <Box
            p="5"
            maxW="500px"
            justifyContent="space-between"
            flexDir="column"
            flexShrink={{ sm: "1", md: "0" }}
          >
            <Image
              borderRadius="md"
              src={currentAlbum.image}
              objectFit="contain"
            />

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
                  />
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
                  />
                </b>
              </Text>
            </Flex>
          </Box>
          {currentAlbum.wiki ? (
            <Box d="flex" flexShrink="1" m={4}>
              <Text
                fontSize="xl"
                dangerouslySetInnerHTML={{ __html: currentAlbum.wiki }}
              ></Text>
            </Box>
          ) : (
            <Box></Box>
          )}
        </Box>
        <Box bg="gray.600" mx="32" mt={1} color="white">
          <Center>
            <ButtonGroup>
              <Button
                onClick={() => {
                  handleClick();
                }}
              >
                Listened
              </Button>
              <Button>Want to Listen</Button>
              <Button>Listening</Button>
            </ButtonGroup>
          </Center>
        </Box>
        <Box>
          <Box mt={8} mx={32}>
            {" "}
            <Heading>Tracklist </Heading>
          </Box>

          {Array.isArray(currentAlbum.tracks) ? (
            <Box bg="gray.600" mx="32" mt={1} color="white">
              <Stack spacing={4}>
                {currentAlbum.tracks.map((track) => {
                  return (
                    <Box
                      d="flex"
                      shadow="md"
                      borderWidth="1px"
                      alignItems="baseline"
                      flexDir="row"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Text as="span">
                          <b>{track["@attr"].rank}.</b>
                        </Text>
                        <Link ml={2} fontSize="md" href={track.url}>
                          {track.name}
                        </Link>
                      </Box>

                      <Text>{convertTime(track.duration)}</Text>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          ) : (
            <></>
          )}
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

function convertTime(time) {
  return time.toString().replace(/(.{2})$/, ":$1");
}

export default AlbumPage;
