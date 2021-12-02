import { Box, Heading, Flex, Skeleton, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAlbum } from "../../providers/albumProvider";
import { useAction } from "../../providers/actionProvider";

import { useRouter } from "next/router";
import { albumInfoFetch } from "../../utils/fetch";
import useSWR from "swr";

import ActionButtons from "./ActionButtons";
import Tracklist from "./Tracklist";

import useAverageColor from "../../utils/useAverageColor";
import ReviewsController from "../Reviews/ReviewsController";
import useAverageRating from "../../utils/useAverageRating";

import fetchAlbumReviews from "../../utils/queries/fetchAlbumReviews";
import { useQuery } from "react-query";
import AlbumInfo from "./AlbumInfo";
import axios from "axios";

function AlbumPage() {
  const router = useRouter();
  const album = useAlbum();

  let artist, albumName, color;
  let tagArray = [];
  let avgRating;
  let currentAlbum = {};
  if (router.query.slug) {
    artist = router.query.slug[0];
    albumName = router.query.slug[1];
  }
  useEffect(() => {
    if (router.query.slug) {
      artist = router.query.slug[0];
      albumName = router.query.slug[1];

      album.getID(albumName, artist);
    }
  }, [router.query.slug]);

  const reviewsQuery = useQuery(["fetchReviews", albumName, artist], () =>
    fetchAlbumReviews(albumName, artist)
  );

  const { data, error, isLoading } = useQuery(
    ["fetchInfo", albumName, artist],
    () =>
      axios
        .get(
          `
    ${albumInfoFetch} + &album=${albumName}&artist=${artist}`
        )
        .then((res) => res.data),
    { enabled: !!albumName && !!artist }
  );

  if (data) {
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

    data.album?.tags?.tag?.map((tag) => tagArray.push([tag.name, tag.url]));

    currentAlbum.tags = tagArray.sort(function (a, b) {
      return a[0].length - b[0].length;
    });
  }

  color = useAverageColor(currentAlbum?.image);
  avgRating = useAverageRating(reviewsQuery?.data);

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
  if (error || isLoading) {
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
  if (data && !isLoading) {
    return (
      <>
        <AlbumInfo
          currentAlbum={currentAlbum}
          color={color}
          avgRating={avgRating}
        />
        <ActionButtons name={currentAlbum.name} artist={currentAlbum.artist} />
        <Box w="80%" mx="auto" mt={10} mb={5} color="white">
          <Flex
            pb={10}
            flexDir={{ base: "column", md: "row" }}
            justifyContent={{ base: "center", md: "space-between" }}
            // w="100%"
            // mx={["auto", "24"]}
            // flexGrow="1"

            // alignItems="center"
          >
            {Array.isArray(currentAlbum.tracks) ? (
              <Box w={{ base: "100%", md: "40%" }} pr={{ md: 10 }}>
                <Box>
                  {" "}
                  <Heading>tracklist</Heading>
                </Box>
                <Tracklist color={color} tracks={currentAlbum.tracks} />
              </Box>
            ) : (
              <></>
            )}
            <Box w={{ base: "100%", md: "60%" }} mt={{ base: 10, md: 0 }}>
              <ReviewsController
                albumName={albumName}
                artist={artist}
                color={color}
                data={reviewsQuery.data}
                isLoading={reviewsQuery.isLoading}
              />
            </Box>
          </Flex>
        </Box>
      </>
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

export default AlbumPage;
