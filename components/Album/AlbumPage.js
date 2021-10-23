import {
  Box,
  Heading,
  Flex,
  Text,
  Skeleton,
  Stack,
  Link,
  Button,
  Collapse,
  SimpleGrid,
  Grid,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAlbum } from "../../providers/albumProvider";
import { useAction } from "../../providers/actionProvider";

import { useRouter } from "next/router";
import { albumInfoFetch } from "../../utils/fetch";
import useSWR from "swr";
import { MdPeople, MdPlayArrow } from "react-icons/md";

import NumberFormat from "react-number-format";
import ActionButtons from "./ActionButtons";
import Tags from "./Tags";
import Tracklist from "./Tracklist";
import Wiki from "./Wiki";
import Image from "next/image";

function AlbumInfo() {
  const router = useRouter();
  const album = useAlbum();
  const action = useAction();
  const [show, setShow] = useState(false);
  const [fetch, setFetch] = useState(false);
  const { colorMode } = useColorMode();

  const handleToggle = () => setShow(!show);
  let artist, albumName;
  let tagArray = [];
  if (router.query.slug) {
    artist = router.query.slug[0];
    albumName = router.query.slug[1];
  }
  const { data, error, isValidating } = useSWR(
    fetch ? `${albumInfoFetch}&album=${albumName}&artist=${artist}` : null,
    {
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      dedupingInterval: 1000000,
    }
  );

  let currentAlbum = {};

  const searchSubmit = () => {
    router.push({
      pathname: "/search",
      query: { input: currentAlbum.artist },
    });
  };

  useEffect(() => {
    if (router.query.slug) {
      artist = router.query.slug[0];
      albumName = router.query.slug[1];

      album.getID(albumName, artist);
      setFetch(true);
    }
  }, [router.query.slug]);
  if (!data) {
    return (
      <>
        <Box w="80%" mx="auto" mt={10} d="flex">
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
        <Box
          w="80%"
          mx="auto"
          mt={10}
          d="flex"
          rounded="lg"
          boxShadow="lg"
          flexDir="column"
        >
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
      </>
    );
  }
  if (error || isValidating) {
    return (
      <>
        <Box w="80%" mx="auto" mt={10} d="flex">
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
        <Box w="80%" mx="auto" mt={10} d="flex">
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
      </>
    );
  }
  if (data && !album.loading) {
    currentAlbum = {
      artist: data.album.artist,
      name: data.album.name,
      wiki: data.album.wiki?.content,
      image: data.album.image[4]["#text"],
      url: data.album.url,
      listeners: data.album.listeners,
      playcount: data.album.playcount,
      tracks: data.album.tracks?.track,
    };

    data.album.tags?.tag?.map((tag) => tagArray.push([tag.name, tag.url]));

    currentAlbum.tags = tagArray.sort(function (a, b) {
      return a[0].length - b[0].length;
    });

    return (
      <div>
        <Box
          w="80%"
          mx="auto"
          mt={10}
          d="flex"
          flexGrow="1"
          justifyContent={{
            base: "center",
            sm: "center",
            md: "center",
            lg: "space-between",
          }}
          border="5px solid"
          borderColor="purple.600"
          borderRadius="sm"
          rounded="xl"
          boxShadow="lg"
          flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
        >
          <Box
            p="5"
            d="flex"
            justifyContent={{ base: "center", sm: "center", md: "center" }}
            flexShrink={{ sm: "1", md: "0" }}
            flexFlow="column wrap"
            color={colorMode === "dark" ? "white" : "black"}
          >
            <Image
              width={350}
              height={350}
              src={currentAlbum.image}
              objectFit="contain"
            />

            <Text
              mt={2}
              fontSize="xl"
              fontWeight="bold"
              lineHeight="short"
              _hover={{ color: "tomato" }}
              textDecoration="false"
            >
              <Link href={currentAlbum.url}>{currentAlbum.name}</Link>
            </Text>
            <Text
              mt={2}
              fontSize="lg"
              fontWeight="semibold"
              _hover={{ color: "tomato" }}
            >
              <Link onClick={() => searchSubmit()}> {currentAlbum.artist}</Link>
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
              columns={{ base: 2, sm: 4, md: 5, lg: 3 }}
              row={{ base: 4, sm: 2, md: 1, lg: 4 }}
              spacingY="2"
              spacingX="2"
            >
              {currentAlbum.tags ? (
                currentAlbum.tags.map((tag) => <Tags key={tag.url} tag={tag} />)
              ) : (
                <></>
              )}
            </SimpleGrid>
          </Box>
          {currentAlbum.wiki ? (
            <Box>
              {" "}
              <Wiki summary={currentAlbum.wiki} />
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <ActionButtons name={currentAlbum.name} artist={currentAlbum.artist} />

        {Array.isArray(currentAlbum.tracks) ? (
          <Box pb={10}>
            <Box w="80%" mx="auto">
              {" "}
              <Heading>tracklist</Heading>
            </Box>
            <Tracklist tracks={currentAlbum.tracks} />
          </Box>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <>
        <Box w="80%" mx="auto" mt={10} d="flex" rounded="lg" flexDir="column">
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
        <Box
          w="80%"
          mx="auto"
          mt={10}
          d="flex"
          rounded="lg"
          boxShadow="lg"
          flexDir="column"
        >
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            h="30rem"
            rounded="lg"
          />
        </Box>
      </>
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

export default AlbumPage;
