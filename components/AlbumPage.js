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
  HStack,
  Spacer,
  Collapse,
  SimpleGrid,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAlbum } from "../providers/albumProvider";
import { useAction } from "../providers/actionProvider";

import { useRouter } from "next/router";
import { albumInfoFetch } from "../utils/fetch";
import useSWR from "swr";
import { MdStar, MdPeople, MdPlayArrow } from "react-icons/md";
import { Suspense } from "react";
import fetcher from "../utils/fetcher";
import NumberFormat from "react-number-format";
import ActionButtons from "./ActionButtons";
import Tags from "./Tags";

function AlbumInfo() {
  const [mounted, setMounted] = useState(false);
  const [mbid, setMBID] = useState("");
  const router = useRouter();
  const album = useAlbum();
  const action = useAction();
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);
  // console.log(router.query.slug);
  let artist, albumName;
  if (router.query.slug) {
    artist = router.query.slug[0];
    albumName = router.query.slug[1];
  }

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
  if (data && !album.loading) {
    console.log(data);
    console.log(album.albumID);
    currentAlbum = {
      artist: data.album.artist,
      name: data.album.name,
      wiki: data.album.wiki?.content,
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
          justifyContent={{ sm: "center", md: "center", lg: "space-between" }}
          rounded="lg"
          boxShadow="lg"
          flexDir={{ sm: "column", md: "column", lg: "row" }}
        >
          <Box
            p="5"
            d="flex"
            justifyContent={{ sm: "center", md: "space-between" }}
            flexShrink={{ sm: "1", md: "0" }}
            flexFlow="column "
          >
            <Image
              borderRadius="md"
              rounded="lg"
              boxShadow="lg"
              src={currentAlbum.image}
              objectFit="contain"
            />

            <Text
              mt={2}
              fontSize="xl"
              fontWeight="bold"
              lineHeight="short"
              _hover={{ color: "purple.600" }}
              textDecoration="false"
            >
              <Link href={currentAlbum.url}>{currentAlbum.name}</Link>
            </Text>
            <Text mt={2} fontSize="lg" fontWeight="semibold">
              {currentAlbum.artist}
            </Text>
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
            <SimpleGrid
              mt={3}
              minChildWidth={{ sm: "80px", md: "" }}
              // columns={{ md: 10, lg: 3 }}
              // row={{ md: 1, lg: 4 }}
              spacingY="1"
              // autoColumns="min-content"
            >
              {currentAlbum.tags ? (
                currentAlbum.tags.map((tag) => <Tags key={tag.url} tag={tag} />)
              ) : (
                <></>
              )}
            </SimpleGrid>
          </Box>

          <Box d="flex" flexDir="column">
            <Box>
              {currentAlbum.wiki ? (
                <Box flexShrink="1" m={4}>
                  <Collapse startingHeight="22rem" in={show} rounded="lg">
                    <Text
                      fontFamily="Helvetica"
                      fontSize="xl"
                      fontWeight="semibold"
                      dangerouslySetInnerHTML={{ __html: currentAlbum.wiki }}
                      color="white"
                    ></Text>
                  </Collapse>
                  <Box d="flex" flexDir="row-reverse">
                    {" "}
                    <Button
                      fontFamily="Helvetica"
                      fontWeight="semibold"
                      size="md"
                      onClick={handleToggle}
                      mt="1rem"
                      rounded="xl"
                    >
                      show {show ? "less" : "more"}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box></Box>
              )}
            </Box>
          </Box>
        </Box>
        {/* {album.albumID ? (
          <ActionButtons
            name={currentAlbum.name}
            artist={currentAlbum.artist}
          />
        ) : (
          <></>
        )} */}
        <ActionButtons name={currentAlbum.name} artist={currentAlbum.artist} />
        <Box
          w="80%"
          mx="auto"
          mt={10}
          color="white"
          d="flex"
          flexGrow="1"
          alignItems="flex-start"
          justifyContent={{ sm: "center", md: "center", lg: "space-between" }}
          rounded="lg"
          boxShadow="lg"
          flexDir="column"
          mb="10"
        >
          <Box mb={6}>
            {" "}
            <Heading>Tracklist </Heading>
          </Box>

          {Array.isArray(currentAlbum.tracks) ? (
            <Box
              bg="gray.600"
              mt={1}
              color="white"
              w="50%"
              rounded="lg"
              boxShadow="lg"
              p={5}
            >
              <Stack spacing={4}>
                {currentAlbum.tracks.map((track) => {
                  return (
                    <Box
                      d="flex"
                      alignItems="baseline"
                      flexDir="row"
                      justifyContent="space-between"
                      _hover={{ bg: "tomato" }}
                      rounded="xl"
                      p={2}
                    >
                      <Box>
                        <Text as="span" fontSize="lg">
                          <b>{track["@attr"].rank}.</b>
                        </Text>
                        <Text
                          as="span"
                          fontSize="lg"
                          fontWeight="semibold"
                          _hover={{ color: "purple.600" }}
                        >
                          <Link ml={2} fontSize="md" href={track.url}>
                            {track.name}
                          </Link>
                        </Text>
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
  } else {
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
}

function AlbumPage() {
  return (
    <div>
      <AlbumInfo />
    </div>
  );
}

function convertTime(time) {
  if (time) {
    return time.toString().replace(/(.{2})$/, ":$1");
  }
}

export default AlbumPage;
