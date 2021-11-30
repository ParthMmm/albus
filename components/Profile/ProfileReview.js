import React, { useState } from "react";
import { Box, Stack, Text, Link, useColorMode, Flex } from "@chakra-ui/react";
import { RatingView } from "react-simple-star-rating";
import NextLink from "next/link";
import Moment from "react-moment";
import "moment-timezone";

function ProfileReview({ review }) {
  const { colorMode } = useColorMode();

  console.log(review);
  return (
    <Box d="flex" flexDir="column" justifyContent="space-between" rounded="xl">
      <Box>
        <NextLink
          href={{
            pathname: `/album/[...slug]`,
            query: {
              artist: review.album.artist,
              name: review.album.albumName,
            },
          }}
          as={`/album/${review.album.artist}/${encodeURIComponent(
            review.album.albumName
          )}`}
          // passHref
        >
          <Text>
            <Link href="">
              {review.album.artist} - {review.album.albumName}
            </Link>
          </Text>
        </NextLink>
        <Flex>
          <RatingView ratingValue={review.rating} size="1.1rem" />
        </Flex>
        <Text fontSize="xl" fontWeight="bold" as="span">
          {review.title}
        </Text>
        <Text fontSize="md" mt={2}>
          {review.reviewBody}
        </Text>
      </Box>
      <NextLink
        href={{
          pathname: `/profile/${review.user._id}/`,
          query: {
            pid: review.user._id,
          },
        }}
        as={`/profile/${review.user._id}`}
      >
        <Text
          fontSize=".9rem"
          color={colorMode === "dark" ? "gray.400" : "gray.700"}
        >
          by{" "}
          <Link href="" textDecoration="none" _hover={{ color: "tomato" }}>
            {review.user.username}
          </Link>
        </Text>
      </NextLink>
      <Text
        fontSize=".7rem"
        color={colorMode === "dark" ? "gray.500" : "gray.800"}
      >
        <Moment local date={review.datePosted} format="MMM DD, YYYY hh:mm A" />
      </Text>
    </Box>
  );
}

export default ProfileReview;
